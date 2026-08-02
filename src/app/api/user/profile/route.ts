import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

// የተማሪ መረጃ ማምጫ ወይም አዲስ መፍጠሪያ Utility
async function fetchOrCreateUser(email: string) {
  let user = await prisma.userProfile.findUnique({
    where: { email },
    include: {
      enrollments: {
        include: {
          course: {
            include: { lessons: { select: { id: true } } },
          },
        },
      },
      progress: true,
    },
  });

  if (!user) {
    const defaultName = email.split("@")[0];
    user = await prisma.userProfile.create({
      data: {
        email,
        username: defaultName,
        fullName: defaultName,
        xpPoints: 100,
        coins: 100,
        streak: 1,
        currentLevel: 1,
      },
      include: {
        enrollments: {
          include: {
            course: {
              include: { lessons: { select: { id: true } } },
            },
          },
        },
        progress: true,
      },
    });
  }

  return user;
}

function buildUserResponse(user: any) {
  const completedProgress = user.progress ? user.progress.filter((p: any) => p.isCompleted) : [];
  const totalCompletedLessons = completedProgress.length;
  const totalEnrolledCourses = user.enrollments ? user.enrollments.length : 0;

  // Level & XP Progress Calculations
  const currentXP = user.xpPoints ?? 0;
  const currentLevel = Math.floor(currentXP / 1000) + 1;
  const xpInCurrentLevel = currentXP % 1000;
  const levelProgressPercent = Math.min(100, Math.round((xpInCurrentLevel / 1000) * 100));

  const enrolledCourses = (user.enrollments || []).map((enrollment: any) => {
    const course = enrollment.course;
    const totalLessons = course.lessons ? course.lessons.length : 0;
    const completedLessons = user.progress
      ? user.progress.filter((p: any) => course.lessons.some((l: any) => l.id === p.lessonId && p.isCompleted)).length
      : 0;

    const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    return {
      id: course.id,
      title: course.title,
      description: course.description || "",
      thumbnail: course.thumbnail || null,
      totalLessons,
      completedLessons,
      progressPercentage,
    };
  });

  return NextResponse.json({
    success: true,
    user: {
      id: user.id,
      username: user.username || user.fullName || user.email.split("@")[0],
      email: user.email,
      fullName: user.fullName || user.username,
      avatarUrl: user.avatarUrl || null,
      bio: user.bio || null,
      xpPoints: currentXP,
      coins: user.coins ?? 100,
      streak: user.streak ?? 0,
      streakDays: user.streak ?? 0,
      currentLevel: user.currentLevel || currentLevel,
      levelProgressPercent,
    },
    profile: {
      id: user.id,
      email: user.email,
      fullName: user.fullName || user.username,
      avatarUrl: user.avatarUrl || null,
      bio: user.bio || null,
      xpPoints: currentXP,
      coins: user.coins ?? 100,
      streakDays: user.streak ?? 0,
      currentLevel: user.currentLevel || currentLevel,
      levelProgressPercent,
    },
    stats: {
      totalCompletedLessons,
      totalEnrolledCourses,
    },
    enrolledCourses,
  });
}

// GET API
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "ኢሜይል አልተገኘም" }, { status: 400 });
    }

    const user = await fetchOrCreateUser(email);
    return buildUserResponse(user);
  } catch (error) {
    console.error("Profile GET Error:", error);
    return NextResponse.json({ error: "የተማሪ መረጃ ማግኘት አልተቻለም" }, { status: 500 });
  }
}

// POST API
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body.email;

    if (!email) {
      return NextResponse.json({ error: "ኢሜይል አልተገኘም" }, { status: 400 });
    }

    const user = await fetchOrCreateUser(email);
    return buildUserResponse(user);
  } catch (error) {
    console.error("Profile POST Error:", error);
    return NextResponse.json({ error: "የተማሪ መረጃ ማግኘት አልተቻለም" }, { status: 500 });
  }
}

// PUT API (የፕሮፋይል ማስተካከያ)
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { currentEmail, fullName, newEmail, bio, avatarUrl } = body;

    if (!currentEmail) {
      return NextResponse.json({ error: "የአሁኑ ኢሜይል ያስፈልጋል" }, { status: 400 });
    }

    const updatePayload: Record<string, any> = {};
    if (fullName !== undefined) {
      updatePayload.fullName = fullName;
      updatePayload.username = fullName;
    }
    if (newEmail !== undefined) updatePayload.email = newEmail;
    if (bio !== undefined) updatePayload.bio = bio;
    if (avatarUrl !== undefined) updatePayload.avatarUrl = avatarUrl;

    const updatedUser = await prisma.userProfile.update({
      where: { email: currentEmail },
      data: updatePayload,
    });

    return NextResponse.json({
      success: true,
      message: "ፕሮፋይል በትክክል ተስተካክሏል",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Profile PUT Error:", error);
    return NextResponse.json({ error: "ፕሮፋይሉን ማዘመን አልተቻለም፤ እባክዎ እንደገና ይሞክሩ" }, { status: 500 });
  }
}
