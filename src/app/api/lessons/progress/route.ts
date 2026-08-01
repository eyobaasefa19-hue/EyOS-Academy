import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, lessonId, xpReward = 10, coinReward = 5 } = await req.json();

    if (!email || !lessonId) {
      return NextResponse.json(
        { error: "ኢሜይል (Email) እና Lesson ID ያስፈልጋሉ" },
        { status: 400 }
      );
    }

    // 1. የተማሪውን ፕሮፋይል መፈለግ
    const userProfile = await prisma.userProfile.findUnique({
      where: { email },
    });

    if (!userProfile) {
      return NextResponse.json(
        { error: "የተማሪ ፕሮፋይል አልተገኘም" },
        { status: 404 }
      );
    }

    // 2. የትምህርቱን ሂደት (Lesson Progress) መመዝገብ ወይም ማዘመን
    const existingProgress = await prisma.lessonProgress.findUnique({
      where: {
        userId_lessonId: {
          userId: userProfile.id,
          lessonId,
        },
      },
    });

    const isFirstTime = !existingProgress || !existingProgress.isCompleted;

    const progress = await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: userProfile.id,
          lessonId,
        },
      },
      update: {
        isCompleted: true,
      },
      create: {
        userId: userProfile.id,
        lessonId,
        isCompleted: true,
      },
    });

    // 3. ትምህርቱን ለመጀመሪያ ጊዜ ሲጨርስ XP እና Coins መጨመር
    let updatedProfile = userProfile;
    if (isFirstTime) {
      updatedProfile = await prisma.userProfile.update({
        where: { id: userProfile.id },
        data: {
          xpPoints: { increment: xpReward },
          coins: { increment: coinReward },
        },
      });
    }

    return NextResponse.json({
      success: true,
      progress,
      rewardGiven: isFirstTime,
      newXp: updatedProfile.xpPoints,
      newCoins: updatedProfile.coins,
    });
  } catch (error) {
    console.error("Lesson Progress API Error:", error);
    return NextResponse.json(
      { error: "የትምህርቱን ሂደት መመዝገብ አልተቻለም" },
      { status: 500 }
    );
  }
}
