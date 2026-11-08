import { NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/db/prisma';
import { createSession } from '@/lib/auth/session';
import { rateLimit } from '@/lib/rate-limit';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    preferredLanguage: z.enum(['en', 'bn']).default('en'),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the Terms of Service and Privacy Policy',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'local';
    const rateCheck = await rateLimit(`register:${ip}`, { limit: 5, windowMs: 60 * 1000 });

    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'Too many registration requests. Please wait a moment.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || 'Validation error' },
        { status: 400 }
      );
    }

    const { name, email, password, preferredLanguage } = parsed.data;
    const cleanEmail = email.toLowerCase().trim();

    const existingUser = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Find default FREE plan
    const freePlan = await prisma.subscriptionPlan.findUnique({
      where: { code: 'FREE' },
    });

    // Create user with transaction
    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email: cleanEmail,
          passwordHash,
          preferredLanguage: 'en',
          profile: {
            create: {
              country: 'Bangladesh',
            },
          },
          preference: {
            create: {
              language: 'en',
              theme: 'system',
            },
          },
          learningStreak: {
            create: {
              currentStreak: 0,
              longestStreak: 0,
            },
          },
        },
      });

      if (freePlan) {
        await tx.subscription.create({
          data: {
            userId: user.id,
            planId: freePlan.id,
            status: 'ACTIVE',
          },
        });
      }

      await tx.auditLog.create({
        data: {
          userId: user.id,
          action: 'USER_REGISTERED',
          ipAddress: ip,
        },
      });

      return user;
    });

    // Create session
    await createSession(newUser.id, request.headers);

    return NextResponse.json({
      success: true,
      redirectUrl: '/dashboard',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during account creation' },
      { status: 500 }
    );
  }
}
