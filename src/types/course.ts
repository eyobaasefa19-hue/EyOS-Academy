export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced" | "All Levels";

export interface Lesson {
  id: string;
  title: string;
  duration: string; // e.g., "12:45"
  videoUrl?: string;
  isFreePreview: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  avatar: string;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  category: string;
  price: number; // በ ETB ወይም USD
  discountPrice?: number;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  duration: string;
  lessonsCount: number;
  difficulty: DifficultyLevel;
  language: string;
  instructor: Instructor;
  isFeatured?: boolean;
  isTrending?: boolean;
  isEnrolled?: boolean;
  isBookmarked?: boolean;
  progress?: number; // 0 - 100%
  chapters?: Chapter[];
}
