import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

// GET: የተማሪውን Profile ከ Database ማምጫ
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email") || "user@example.com";

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

    // ተማሪው በዳታቤዝ ከሌለ በራስ-ሰር መፍጠር
    if (!user) {
      const defaultUsername = email.split("@")[0];
      user = await prisma.userProfile.create({
        data: {
          email,
          username: defaultUsername,
          fullName: defaultUsername,
          xpPoints: 100,
          coins: 50,
          streak: 1,
          currentLevel: 1,
        },
        include: {
          enrollments: {
            include: {
              course: { include: { lessons: { select: { id: true } } } },
            },
          },
          progress: true,
        },
      });
    }

    const completedProgressList = user.progress.filter((p) => p.isCompleted);
    const totalCompletedLessons = completedProgressList.length;
    const totalEnrolledCourses = user.enrollments.length;

    const enrolledCourses = user.enrollments.map((enrollment) => {
      const course = enrollment.course;
      const totalLessons = course.lessons.length;
      const completedLessons = user.progress.filter((p) =>
        course.lessons.some((l) => l.id === p.lessonId && p.isCompleted)
      ).length;

      const progressPercentage =
        totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

      return {
        id: course.id,
        title: course.title,
        description: (course as Record<string, unknown>).description || "",
        thumbnail: (course as Record<string, unknown>).thumbnail || null,
        totalLessons,
        completedLessons,
        progressPercentage,
      };
    });

    return NextResponse.json({
      success: true,
      profile: {
        id: user.id,
        email: user.email,
        fullName: user.fullName || user.username,
        avatarUrl: (user as Record<string, unknown>).avatarUrl || null,
        bio: (user as Record<string, unknown>).bio || null,
        xpPoints: user.xpPoints ?? 0,
        coins: user.coins ?? 0,
        streakDays: user.streak ?? 0,
      },
      stats: {
        totalCompletedLessons,
        totalEnrolledCourses,
      },
      enrolledCourses,
    });
  } catch (error) {
    console.error("Profile GET Error:", error);
    return NextResponse.json({ error: "የተማሪ መረጃ ማግኘት አልተቻለም" }, { status: 500 });
  }
}

// PUT: የተማሪውን መረጃ (ስም፣ ኢሜይል፣ Bio፣ Avatar) በ Database ውስጥ ማዘመኛ
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { currentEmail, fullName, newEmail, bio, avatarUrl } = body;

    if (!currentEmail) {
      return NextResponse.json({ error: "የአሁኑ ኢሜይል ያስፈልጋል" }, { status: 400 });
    }

    // መረጃውን በ Prisma ማዘመን
    const updatedUser = await prisma.userProfile.update({
      where: { email: currentEmail },
      data: {
        fullName: fullName || undefined,
        email: newEmail || currentEmail,
        bio: bio !== undefined ? bio : undefined,
        avatarUrl: avatarUrl !== undefined ? avatarUrl : undefined,
      },
    });

    return NextResponse.json({
      success: true,
      message: "ፕሮፋይል በትክክል ተስተካክሏል",
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        bio: (updatedUser as Record<string, unknown>).bio || null,
        avatarUrl: (updatedUser as Record<string, unknown>).avatarUrl || null,
      },
    });
  } catch (error) {
    console.error("Profile PUT Error:", error);
    return NextResponse.json({ error: "ፕሮፋይሉን ማዘመን አልተቻለም" }, { status: 500 });
  }
}
