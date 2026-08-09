import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // ወይም የ Supabase client ማዋቀሪያህ

export async function POST(req: Request) {
  try {
    const { userId, xp } = await req.json();

    // የቀረበው መረጃ ትክክለኛ መሆኑን ማረጋገጫ (Validation)
    if (!userId || typeof xp !== 'number') {
      return NextResponse.json(
        { error: 'UserId እና ትክክለኛ የ XP መጠን ያስፈልጋል' },
        { status: 400 }
      );
    }

    // በ ዴታቤዝ ውስጥ የነበረውን XP ላይ አዲሱን መጨመር (Increment)
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        xp: {
          increment: xp,
        },
      },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Error updating XP:', error);
    return NextResponse.json(
      { error: 'XP ማስተካከል አልተቻለም' },
      { status: 500 }
    );
  }
}
