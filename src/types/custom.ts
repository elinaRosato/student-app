import { Database } from "./supabase";

export type Course = Database["public"]["Tables"]["courses"]["Row"];

export type MinimalCourse = Pick<Course, "course_id" | "course_name">;

export type Notebook = {
  notebook_id: number;
  notebook_name: string;
  notebook_courses: {
    course_id: number;
    courses: {
      course_name: string;
    } | null; // Allow `courses` to be null
  }[];
};