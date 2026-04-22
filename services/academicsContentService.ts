import connectDB from "@/lib/mongodb";
import AcademicsContent, { IAcademicsContent } from "@/models/AcademicsContent";

const defaultAcademicsContent = {
  hero: {
    heading: "Elite",
    headingHighlight: "Curriculum.",
    description: '"Academic rigour meets creative freedom. We cultivate minds that think differently and lead effectively."',
    image: "https://images.unsplash.com/photo-1523050853063-bd40d04b68ce?q=80&w=2070",
  },
  programs: [
    {
      title: "Primary Foundation",
      level: "Std 1 to 5",
      tagline: "Building Bright Beginnings",
      description: "Our primary program focuses on sensory and play-based learning, ensuring every child develops a love for discovery while mastering core literacy and numeracy.",
      features: ["Experimental Science", "Vedic Mathematics", "Creative Storytelling", "Environmental Awareness"],
      image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2070",
      color: "from-blue-500/10 to-transparent"
    },
    {
      title: "Secondary Excellence",
      level: "Std 6 to 10",
      tagline: "Critical Thinking & Character",
      description: "Students transition into abstract reasoning and critical analysis. We combine rigorous board curriculum with real-world application to prepare them for global stages.",
      features: ["Robotics & Coding", "Advanced Social Sciences", "Foreign Language Lab", "Competitive Sports"],
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2023",
      color: "from-amber-500/10 to-transparent"
    },
    {
      title: "Higher Secondary",
      level: "Std 11 & 12",
      tagline: "Career & Leadership Portals",
      description: "Dedicated streams for Science, Commerce, and Arts with personalized mentoring. We focus on entrance exam mastery and professional portfolio development.",
      features: ["University Guidance", "Research Workshops", "Enterprise Training", "Creative Portfolio"],
      image: "https://images.unsplash.com/photo-1523050853063-bd40d04b68ce?q=80&w=2070",
      color: "from-primary/10 to-transparent"
    }
  ],
  activities: [
    {
      title: "Extracurricular Programs",
      description: "Our comprehensive extracurricular programs run throughout the academic year, fostering teamwork, leadership, and physical excellence across multiple disciplines.",
      images: [
        "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2070",
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2023",
        "https://images.unsplash.com/photo-1523050853063-bd40d04b68ce?q=80&w=2070"
      ]
    }
  ]
};

export async function getAcademicsContent() {
  await connectDB();
  let content = await AcademicsContent.findOne();
  if (!content) {
    content = await AcademicsContent.create(defaultAcademicsContent);
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
