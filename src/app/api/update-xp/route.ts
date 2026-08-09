import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// የ Database ኮኔክሽን እንዳይጨናነቅ የሚጠብቅ ሎጂክ (Global Singleton)
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: 'የተጠቃሚ መለያ (User ID) ያስፈልጋል' }, { status: 400 });
    }

    // በ Prisma Schema ላይ ሞዴሉ UserProfile ስለሆነ prisma.userProfile ጥቅም ላይ ይውላል
    const updatedUser = await prisma.userProfile.update({
      where: { id: userId },
      data: { 
        xpPoints: { increment: 10 } 
      },
    });

    return NextResponse.json({ success: true, newXp: updatedUser.xpPoints });
    
  } catch (error) {
    console.error('XP Update Error:', error);
    return NextResponse.json({ error: 'XP መጨመር አልተቻለም' }, { status: 500 });
  }
}
