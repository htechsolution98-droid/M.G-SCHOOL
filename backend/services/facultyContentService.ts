import connectDB from "@/lib/mongodb";
import FacultyContent from "@/backend/models/FacultyContent";

const defaultFacultyContent = {
  hero: {
    heading: "Inspiring ",
    headingHighlight: "Mentors.",
    description: "Meet the dedicated educators who are shaping the future of our students with passion and expertise.",
    slides: [],
  },
  facultyMembers: [
    {
      name: "Dr. Rajesh Shah",
      designation: "Principal",
      expertise: "Educational Leadership",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80",
      block: "BUILDING A",
      experience: "20+ Years",
      education: "Ph.D. in Education",
    },
    {
      name: "Mrs. Anjali Desai",
      designation: "Senior Coordinator",
      expertise: "Mathematics",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80",
      block: "BUILDING B",
      experience: "15+ Years",
      education: "M.Sc. Mathematics",
    },
  ],
};

export async function getFacultyContent() {
  await connectDB();
  let content = await FacultyContent.findOne();
  if (!content) {
    content = await FacultyContent.create(defaultFacultyContent);
  }
  return content;
}

export async function updateFacultyHero(hero: any) {
  await connectDB();
  let content = await FacultyContent.findOne();
  if (!content) {
    content = await FacultyContent.create({ ...defaultFacultyContent, hero });
  } else {
    content.hero = hero;
    content.updatedAt = new Date();
    await content.save();
  }
  return content;
}

export async function updateFacultyMembers(facultyMembers: any[]) {
  await connectDB();
  let content = await FacultyContent.findOne();
  if (!content) {
    content = await FacultyContent.create({ ...defaultFacultyContent, facultyMembers });
  } else {
    content.facultyMembers = facultyMembers;
    content.updatedAt = new Date();
    await content.save();
  }
  return content;
}

export async function deleteFacultyContent() {
  await connectDB();
  return await FacultyContent.deleteMany({});
}
