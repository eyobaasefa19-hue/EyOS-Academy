import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

// የ Profile ዳታን አዘጋጅቶ የሚመልስ የጋራ Function
async function getUserProfileResponse(email: string) {
  // 1. የተማሪውን Profile ከነ Enrollments እና Progress መፈለግ
  let user = await prisma.userProfile.findUnique({
    where: { email },
    include: {
      enrollments: {
        include: {
          course: {
            include: {
              lessons: { select: { id: true } },
            },
          },
        },
      },
      progress: true,
    },
  });

  // 2. ተማሪው አዲስ ከሆነ በራስ-ሰር መፍጠር
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
        dailyGoalPercent: 10,
      },
      include: {
        enrollments: {
          include: {
            course: {
              include: {
                lessons: { select: { id: true } },
              },
            },
          },
        },
        progress: true,
      },
    });
  }

  // 3. አጠቃላይ ያለቁ ትምህርቶች እና የተመዘገቡባቸው ኮርሶች ብዛት ማስላት
  const completedProgressList = user.progress.filter((p) => p.isCompleted);
  const totalCompletedLessons = completedProgressList.length;
  const totalEnrolledCourses = user.enrollments.length;

  // 4. የእያንዳንዱን ኮርስ Progress Percentage እና ያለቁ ትምህርቶች ብዛት ማስላት
  const enrolledCourses = user.enrollments.map((enrollment) => {
    const course = enrollment.course;
    const totalLessons = course.lessons.length;

    const completedLessons = user.progress.filter((p) =>
      course.lessons.some((l) => l.id === p.lessonId && p.isCompleted)
    ).length;

    const progressPercentage =
      totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;

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

  // 5. በ Frontend ለሚጠበቀው Structure በትክክል መልስ መስጠት
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
}

// GET Method Handler (በ Frontend በ fetch የሚጠራው)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email") || "user@example.com";

    return await getUserProfileResponse(email);
  } catch (error) {
    console.error("Profile GET API Error:", error);
    return NextResponse.json(
      { error: "የተማሪ መረጃ ማግኘት አልተቻለም" },
      { status: 500 }
    );
  }
}

// POST Method Handler (በተጨማሪነት ዝግጁ የሆነ)
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = body.email || "user@example.com";

    return await getUserProfileResponse(email);
  } catch (error) {
    console.error("Profile POST API Error:", error);
    return NextResponse.json(
      { error: "የተማሪ መረጃ ማግኘት አልተቻለም" },
      { status: 500 }
    );
  }
}
