import connectDB from "@/lib/mongodb";
import AcademicsContent, { IAcademicsContent } from "@/models/AcademicsContent";

const defaultAcademicsContent = {
  hero: {
    heading: "",
    headingHighlight: "",
    description: "",
    image: "",
    images: [],
  },
  programs: [
    {
      title: "Primary Foundation",
      level: "Std 1 to 5",
      tagline: "Building Bright Beginnings",
      description: "Our primary program focuses on sensory and play-based learning, ensuring every child develops a love for discovery while mastering core literacy and numeracy.",
      features: ["Experimental Science", "Vedic Mathematics", "Creative Storytelling", "Environmental Awareness"],
      image: "",
      color: "from-blue-500/10 to-transparent"
    },
    {
      title: "Secondary Excellence",
      level: "Std 6 to 10",
      tagline: "Critical Thinking & Character",
      description: "Students transition into abstract reasoning and critical analysis. We combine rigorous board curriculum with real-world application to prepare them for global stages.",
      features: ["Robotics & Coding", "Advanced Social Sciences", "Foreign Language Lab", "Competitive Sports"],
      image: "",
      color: "from-amber-500/10 to-transparent"
    },
    {
      title: "Higher Secondary",
      level: "Std 11 & 12",
      tagline: "Career & Leadership Portals",
      description: "Dedicated streams for Science, Commerce, and Arts with personalized mentoring. We focus on entrance exam mastery and professional portfolio development.",
      features: ["University Guidance", "Research Workshops", "Enterprise Training", "Creative Portfolio"],
      image: "",
      color: "from-primary/10 to-transparent"
    }
  ],
  activities: [
    {
      title: "Extracurricular Programs",
      description: "Our comprehensive extracurricular programs run throughout the academic year, fostering teamwork, leadership, and physical excellence across multiple disciplines.",
      images: []
    }
  ],
  teacherDuties: [
    {
      category: "1. ADMINISTRATIVE & ACADEMIC DUTIES",
      duty: "Activity Promoter",
      teachers: "Varsha ma’am",
      description: "Plan and coordinate school activities, celebrations, competitions"
    },
    {
      category: "1. ADMINISTRATIVE & ACADEMIC DUTIES",
      duty: "Examination Department",
      teachers: "Neetu Ma’am",
      description: "Paper setting, timetable, supervision, result preparation"
    },
    {
      category: "1. ADMINISTRATIVE & ACADEMIC DUTIES",
      duty: "Time Table In-charge",
      teachers: "Deepa Ma’am",
      description: "Prepare and manage school timetable for all classes"
    },
    {
      category: "1. ADMINISTRATIVE & ACADEMIC DUTIES",
      duty: "Parents Meetings Coordinator",
      teachers: "Mamta ma’am",
      description: "Arrange PTM (Parent-Teacher Meetings) and maintain records"
    },
    {
      category: "1. ADMINISTRATIVE & ACADEMIC DUTIES",
      duty: "Supervisor",
      teachers: "Deepa ma’am",
      description: "Overall monitoring of classes, discipline, and daily functioning"
    },
    {
      category: "1. ADMINISTRATIVE & ACADEMIC DUTIES",
      duty: "Cabinet Form In-charge",
      teachers: "N.A.",
      description: "Manage student cabinet / leadership selection and records"
    },
    {
      category: "2. ACADEMIC SUPPORT DUTIES",
      duty: "English Communication In-charge",
      teachers: "Kanchan Ma’am",
      description: "Improve English speaking, reading, writing activities"
    },
    {
      category: "2. ACADEMIC SUPPORT DUTIES",
      duty: "Library In-charge",
      teachers: "Kusum ma’am",
      description: "Manage books, issue/return system, reading activities"
    },
    {
      category: "3. DISCIPLINE & MANAGEMENT",
      duty: "Discipline In-charge",
      teachers: "Sakshi ma’am, suman ma’am",
      description: "Maintain student discipline, rules enforcement"
    },
    {
      category: "3. DISCIPLINE & MANAGEMENT",
      duty: "Assembly In-charge",
      teachers: "Reshma ma’am, laxmi ma’am",
      description: "Daily assembly planning, prayer, announcements"
    },
    {
      category: "4. ACTIVITY & STUDENT DEVELOPMENT",
      duty: "Saturday Sports",
      teachers: "Rajat sir, Aarti ma’am",
      description: "Organize sports activities every Saturday"
    },
    {
      category: "4. ACTIVITY & STUDENT DEVELOPMENT",
      duty: "Saturday Co-curricular",
      teachers: "Divya Ma'am, khushi ma’am",
      description: "Art, music, dance, craft, quiz activities"
    },
    {
      category: "4. ACTIVITY & STUDENT DEVELOPMENT",
      duty: "School Cleanliness In-charge",
      teachers: "Kajal ma’am",
      description: "Hygiene, classroom cleaning, campus maintenance"
    }
  ]
};

export async function getAcademicsContent() {
  await connectDB();
  let content = await AcademicsContent.findOne();
  if (!content) {
    content = await AcademicsContent.create(defaultAcademicsContent);
  } else if (!content.teacherDuties || content.teacherDuties.length === 0) {
    content.teacherDuties = defaultAcademicsContent.teacherDuties as any;
    await content.save();
  }
  return content;
}

export async function updateAcademicsHero(hero: any) {
  await connectDB();
  let content = await AcademicsContent.findOne();
  if (!content) {
    content = await AcademicsContent.create({ ...defaultAcademicsContent, hero });
  } else {
    content.hero = hero;
    content.updatedAt = new Date();
    await content.save();
  }
  return content;
}

export async function updateAcademicsPrograms(programs: any[]) {
  await connectDB();
  let content = await AcademicsContent.findOne();
  if (!content) {
    content = await AcademicsContent.create({ ...defaultAcademicsContent, programs });
  } else {
    content.programs = programs;
    content.updatedAt = new Date();
    await content.save();
  }
  return content;
}

export async function updateAcademicsActivities(activities: any[]) {
  await connectDB();
  let content = await AcademicsContent.findOne();
  if (!content) {
    content = await AcademicsContent.create({ ...defaultAcademicsContent, activities });
  } else {
    content.activities = activities;
    content.updatedAt = new Date();
    await content.save();
  }
  return content;
}

export async function updateAcademicsTeacherDuties(teacherDuties: any[]) {
  await connectDB();
  let content = await AcademicsContent.findOne();
  if (!content) {
    content = await AcademicsContent.create({ ...defaultAcademicsContent, teacherDuties });
  } else {
    content.teacherDuties = teacherDuties;
    content.updatedAt = new Date();
    await content.save();
  }
  return content;
}
