import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "ያልተፈቀደ አክሰስ (Unauthorized)" },
        { status: 401 }
      );
    }

    // 1. የይዘት/ፕሮፋይል መረጃን ከ Prisma ማግኘት ወይም ከሌለ በራስ-ሰር መፍጠር
    let userProfile = await prisma.userProfile.findUnique({
      where: { userId: user.id },
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

    if (!userProfile) {
      userProfile = await prisma.userProfile.create({
        data: {
          userId: user.id,
          fullName: user.user_metadata?.full_name || "ተማሪ",
          avatarUrl: user.user_metadata?.avatar_url || "",
          xpPoints: 100,
          coins: 50,
          streakDays: 1,
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

    // 2. የሁሉንም ኮርሶች Progress Percentage ማስላት
    const enrolledCourses = userProfile.enrollments.map((enrollment) => {
      const course = enrollment.course;
      const totalLessons = course.lessons.length;

      // ተማሪው በዚሁ ኮርስ ውስጥ ያጠናቀቃቸው ሌሰኖች ብዛት
      const completedLessonsCount = userProfile.progress.filter((p) =>
        course.lessons.some((l) => l.id === p.lessonId && p.isCompleted)
      ).length;

      const progressPercentage =
        totalLessons > 0
          ? Math.round((completedLessonsCount / totalLessons) * 100)
          : 0;

      return {
        id: course.id,
        title: course.title,
        description: course.description,
        thumbnail: course.imageUrl || "/images/course-placeholder.png",
        totalLessons,
        completedLessons: completedLessonsCount,
        progressPercentage,
      };
    });

    // 3. አጠቃላይ ስታቲስቲክስ ስሌት
    const totalCompletedLessons = userProfile.progress.filter(
      (p) => p.isCompleted
    ).length;

    return NextResponse.json({
      success: true,
      profile: {
        id: userProfile.id,
        userId: userProfile.userId,
        fullName: userProfile.fullName,
        avatarUrl: userProfile.avatarUrl,
        bio: userProfile.bio || "",
        xpPoints: userProfile.xpPoints,
        coins: userProfile.coins,
        streakDays: userProfile.streakDays,
        email: user.email,
        createdAt: userProfile.createdAt,
      },
      stats: {
        totalCompletedLessons,
        totalEnrolledCourses: userProfile.enrollments.length,
      },
      enrolledCourses,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "የፕሮፋይል መረጃ ሲመጣ ኤረር ተፈጥሯል" },
      { status: 500 }
    );
  }
}
