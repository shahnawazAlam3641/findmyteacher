import { TeacherProfile } from "@/components/teachers/TeacherProfile"
import teachersData from "@/data/teachers.json"

// Ensure proper typing and export of generateStaticParams
export async function generateStaticParams(): Promise<{ id: string }[]> {
  return teachersData.map((teacher) => ({
    id: String(teacher.id), // Ensure id is converted to string
  }))
}

export default function TeacherProfilePage({ params }: { params: { id: string } }) {
  const teacher = teachersData.find(t => t.id === params.id)
  
  if (!teacher) {
    return null
  }
  
  return <TeacherProfile teacher={teacher} />
}