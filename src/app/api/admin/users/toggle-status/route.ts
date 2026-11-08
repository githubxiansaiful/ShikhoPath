import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAdmin } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';

const statusSchema = z.object({
  userId: z.string().uuid(),
  status: z.enum(['ACTIVE', 'SUSPENDED']),
});

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin();
    const body = await request.json();
    const parsed = statusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
    }

    const { userId, status } = parsed.data;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Do not allow suspending Super Admins
    if (user.role === 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Cannot modify Super Admin status' }, { status: 403 });
    }

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: userId },
        data: { status },
      });

      await tx.adminActivity.create({
        data: {
          adminId: admin.id,
          action: status === 'ACTIVE' ? 'REACTIVATE_USER' : 'SUSPEND_USER',
          targetType: 'USER',
          targetId: userId,
        },
      });
    });

    return NextResponse.json({ success: true, status });
  } catch (error) {
    console.error('Toggle user status error:', error);
    return NextResponse.json({ error: 'Failed to update user status' }, { status: 500 });
  }
}
