import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";

export async function getAllStudents(filters: {
  branch?: string;
  grade?: string;
  status?: string;
}) {
  await connectDB();

  const query: any = {};
  if (filters.branch) query.branch = filters.branch;
  if (filters.grade) query.grade = filters.grade;
  if (filters.status) query.status = filters.status;

  const students = await Student.find(query).sort({ createdAt: -1 });
  return { students, count: students.length };
}

export async function createStudent(data: any) {
  await connectDB();
  const student = await Student.create(data);
  return student;
}

export async function updateStudent(id: string, data: any) {
  await connectDB();

  if (!id) throw new Error("Student ID is required");

  const student = await Student.findByIdAndUpdate(id, data, { new: true });
  if (!student) throw new Error("Student not found");

  return student;
}

export async function deleteStudent(id: string) {
  await connectDB();

  if (!id) throw new Error("Student ID is required");

  const student = await Student.findByIdAndDelete(id);
  if (!student) throw new Error("Student not found");

  return { message: "Student deleted successfully" };
}

export async function getStudentById(id: string) {
  await connectDB();

  if (!id) throw new Error("Student ID is required");

  const student = await Student.findById(id);
  if (!student) throw new Error("Student not found");

  return student;
}
