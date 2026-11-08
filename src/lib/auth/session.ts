import { cookies } from 'next/headers';
import prisma from '@/lib/db/prisma';
import crypto from 'crypto';
import { UserRole, UserStatus } from '@prisma/client';
import { redirect } from 'next/navigation';

const SESSION_COOKIE_NAME = 'shikhopath_session';
const SESSION_DURATION_DAYS = 30;

export async function createSession(userId: string, reqHeaders?: Headers) {
  const sessionToken = crypto.randomBytes(32).toString('hex');
  const expires = new Date();
  expires.setDate(expires.getDate() + SESSION_DURATION_DAYS);

  const ipAddress = reqHeaders?.get('x-forwarded-for') || null;
  const userAgent = reqHeaders?.get('user-agent') || null;

  const session = await prisma.session.create({
    data: {
      sessionToken,
      userId,
      expires,
      ipAddress,
      userAgent,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires,
    path: '/',
  });

  return session;
}

export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (token) {
    try {
      await prisma.session.deleteMany({
        where: { sessionToken: token },
      });
    } catch {
      // Ignored if session already removed
    }
  }

  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!token) return null;

    const session = await prisma.session.findUnique({
      where: { sessionToken: token },
      include: {
        user: {
          include: {
            profile: true,
            preference: true,
            subscriptions: {
              where: { status: 'ACTIVE' },
              include: { plan: true },
              orderBy: { createdAt: 'desc' },
              take: 1,
            },
          },
        },
      },
    });

    if (!session || session.expires < new Date()) {
      if (session) {
        await prisma.session.delete({ where: { id: session.id } }).catch(() => {});
      }
      return null;
    }

    if (session.user.status !== UserStatus.ACTIVE) {
      return null;
    }

    return session.user;
  } catch (error: any) {
    if (
      error?.digest === 'DYNAMIC_SERVER_USAGE' ||
      error?.digest === 'HANGING_PROMISE_REJECTION' ||
      error?.digest?.startsWith('NEXT_REDIRECT')
    ) {
      throw error;
    }
    console.error('Error fetching current user:', error);
    return null;
  }
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }
  return user;
}

export async function requireRole(allowedRoles: UserRole[]) {
  const user = await requireAuth();
  if (!allowedRoles.includes(user.role)) {
    redirect('/dashboard');
  }
  return user;
}

export async function requireAdmin() {
  return requireRole([UserRole.ADMIN, UserRole.SUPER_ADMIN]);
}

export async function requireSuperAdmin() {
  return requireRole([UserRole.SUPER_ADMIN]);
}
