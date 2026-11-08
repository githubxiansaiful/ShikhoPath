import { NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { requireSuperAdmin } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';

const createAdminSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['ADMIN', 'SUPER_ADMIN']).default('ADMIN'),
});

export async function POST(request: Request) {
  try {
    const caller = await requireSuperAdmin();
    const body = await request.json();
    const parsed = createAdminSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || 'Invalid input' }, { status: 400 });
    }

    const { name, email, password, role } = parsed.data;
    const cleanEmail = email.toLowerCase().trim();

    const existing = await prisma.user.findUnique({ where: { email: cleanEmail } });
    if (existing) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newAdmin = await prisma.$transaction(async (tx) => {
      const u = await tx.user.create({
        data: {
          name,
          email: cleanEmail,
          passwordHash,
          role,
          status: 'ACTIVE',
          emailVerified: new Date(),
        },
      });

      await tx.auditLog.create({
        data: {
          userId: caller.id,
          action: 'CREATE_ADMINISTRATOR',
          details: { createdUserId: u.id, email: u.email, role },
        },
      });

      return u;
    });

    return NextResponse.json({ success: true, admin: { id: newAdmin.id, name: newAdmin.name, email: newAdmin.email, role: newAdmin.role } });
  } catch (error) {
    console.error('Create admin error:', error);
    return NextResponse.json({ error: 'Failed to create administrator' }, { status: 500 });
  }
}
