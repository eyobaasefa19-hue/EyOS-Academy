import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      email, 
      lessonId, 
      isCompleted = true, 
      xpReward = 15, 
      coinReward = 5 
    } = body;

    // 1. አስፈላጊ መረጃዎች መሟላታቸውን ማረጋገጥ
    if (!email || !lessonId) {
      return NextResponse.json(
        { error: "ኢሜይል (Email) እና Lesson ID ያስፈልጋሉ" },
        { status: 400 }
      );
    }

    // 2. የተማሪውን ፕሮፋይል መፈለግ
    const userProfile = await prisma.userProfile.findUnique({
      where: { email },
    });

    if (!userProfile) {
      return NextResponse.json(
        { error: "የተማሪ ፕሮፋይል አልተገኘም" },
        { status: 404 }
      );
    }

    // 3. ቀደም ሲል የተመዘገበ የትምህርት ሂደት መኖሩን ማረጋገጥ
    const existingProgress = await prisma.lessonProgress.findUnique({
      where: {
        userId_lessonId: {
          userId: userProfile.id,
          lessonId,
        },
      },
    });

    // ለመጀመሪያ ጊዜ ትምህርቱን የጨረሰ መሆኑን መፈተሽ (ሽልማት ለመስጠት)
    const isFirstTimeCompletion = 
      (!existingProgress || !existingProgress.isCompleted) && isCompleted;

    // 4. በ Prisma Transaction ሁለቱንም ስራዎች በአንድ ላይ መፈጸም
    const result = await prisma.$transaction(async (tx) => {
      // ሀ. የትምህርቱን ሂደት Upsert (ማዘመን ወይም መፍጠር) ማድረግ
      const progress = await tx.lessonProgress.upsert({
        where: {
          userId_lessonId: {
            userId: userProfile.id,
            lessonId,
          },
        },
        update: {
          isCompleted,
        },
        create: {
          userId: userProfile.id,
          lessonId,
          isCompleted,
        },
      });

      // ለ. ለመጀመሪያ ጊዜ ከተጠናቀቀ ብቻ XP እና Coins ማሳደግ
      let updatedUser = userProfile;
      if (isFirstTimeCompletion) {
        updatedUser = await tx.userProfile.update({
          where: { id: userProfile.id },
          data: {
            xpPoints: { increment: xpReward },
            coins: { increment: coinReward },
          },
        });
      }

      return { progress, updatedUser };
    });

    return NextResponse.json({
      success: true,
      progress: result.progress,
      rewardGiven: isFirstTimeCompletion,
      newXp: result.updatedUser.xpPoints,
      newCoins: result.updatedUser.coins,
    });
  } catch (error) {
    console.error("Lesson Progress API Error:", error);
    return NextResponse.json(
      { error: "የትምህርቱን ሂደት መመዝገብ አልተቻለም" },
      { status: 500 }
    );
  }
}
