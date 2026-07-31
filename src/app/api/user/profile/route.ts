import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // 1. ተማሪው በዳታቤዝ ውስጥ ካለ መረጃውን መፈለግ
    let user = await prisma.userProfile.findUnique({
      where: { email },
    });

    // 2. ተማሪው አዲስ ከሆነ በራስ-ሰር አዲስ Profile መፍጠር
    if (!user) {
      const defaultUsername = email.split("@")[0];
      user = await prisma.userProfile.create({
        data: {
          email,
          username: defaultUsername,
          xpPoints: 100, // የመጀመሪያ የባርኮት ሽልማት
          coins: 50,
          streak: 1,
          currentLevel: 1,
          dailyGoalPercent: 10,
        },
      });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Profile API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
