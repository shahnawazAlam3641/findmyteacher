import { TeacherProfile } from "@/components/teachers/TeacherProfile";
import teachersData from "@/data/teachers.json";
import { use } from "react";

// Ensure proper typing and export of generateStaticParams
export async function generateStaticParams(): Promise<{ id: string }[]> {
  return teachersData.map((teacher) => ({
    id: String(teacher.id), // Ensure id is converted to string
  }));
}

export default function TeacherProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const teacher = teachersData.find((t) => t.id === id);

  if (!teacher) {
    return null;
  }

  return <TeacherProfile teacher={teacher} />;
}
