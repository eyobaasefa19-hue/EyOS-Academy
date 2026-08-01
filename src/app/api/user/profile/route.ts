import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "ኢሜይል (Email) ያስፈልጋል" }, { status: 400 });
    }

    // 1. የተማሪውን Profile ከነ Enrollments እና Progress መፈለግ
    let user = await prisma.userProfile.findUnique({
      where: { email },
      include: {
        enrollments: {
          include: {
            course: {
              include: {
                lessons: {
                  select: { id: true },
                },
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

    // 3. የተማሪውን የኮርስ Progress Percentage ማስላት
    const enrolledCourses = user.enrollments.map((enrollment) => {
      const course = enrollment.course;
      const totalLessons = course.lessons.length;

      const completedLessonsCount = user.progress.filter((p) =>
        course.lessons.some((l) => l.id === p.lessonId && p.isCompleted)
      ).length;

      const progressPercent =
        totalLessons > 0
          ? Math.round((completedLessonsCount / totalLessons) * 100)
          : 0;

      return {
        id: course.id,
        title: course.title,
        category: course.category || "General",
        totalLessons,
        progressPercent,
      };
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
        xpPoints: user.xpPoints,
        coins: user.coins,
        streak: user.streak,
        currentLevel: user.currentLevel,
        dailyGoalPercent: user.dailyGoalPercent,
      },
      enrolledCourses,
    });
  } catch (error) {
    console.error("Profile API Error:", error);
    return NextResponse.json(
      { error: "የተማሪ መረጃ ማግኘት አልተቻለም" },
      { status: 500 }
    );
  }
}
