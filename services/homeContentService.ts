import connectDB from "@/lib/mongodb";
import HomeContent, { IHomeContent } from "@/models/HomeContent";

// Default data to seed if no content exists
const defaultHomeContent = {
  heroSlides: [
    {
      tagline: "Premier Education",
      title: "Where Dreams Take Flight",
      description: "Developing global leaders through a perfect blend of tradition and innovation since 1995.",
      cta: "Discover Our Vision",
      link: "/about",
      image: "/images/kids-school (1).jpg",
    },
    {
      tagline: "Academic Rigor",
      title: "A Tradition of Excellence",
      description: "Empowering every student with the tools to excel in an ever-evolving world.",
      cta: "Explore Academics",
      link: "/academics",
      image: "/images/proud-teacher-with-her-elementary-students (1).jpg",
    },
    {
      tagline: "Holistic Growth",
      title: "Nurturing Every Talent",
      description: "Beyond textbooks: cultivating creativity, sportsmanship, and moral integrity.",
      cta: "Life @ M.G. School",
      link: "/events",
      image: "/images/school3 (1).jpg",
    },
  ],
  stats: [
    { label: "Students", value: "2,500+", icon: "Users" },
    { label: "Faculty", value: "150+", icon: "ShieldCheck" },
    { label: "Exp", value: "28 Yrs", icon: "Award" },
  ],
  philosophy: {
    badge: "Established 1995",
    heading: "Cultivating",
    headingHighlight: "Wisdom",
    description:
      "Our curriculum is designed to ignite curiosity. We don't just teach subjects; we inspire a lifelong passion for discovery in an environment that honors both tradition and technological progress.",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071",
    floatingText: "Child-Centric Learning Approach",
    features: ["Intellectual Rigor", "Ethical Leadership", "Physical Wellness", "Creative Expression"],
    ctaText: "Explore Our Legacy",
    ctaLink: "/about",
  },
  campusHubs: [
    {
      id: "block-a",
      name: "Block A",
      hub: "Foundation Hub",
      title: "Primary Foundation",
      desc: "Activity-based learning for Std 1–8 in our vibrant Gujarati Medium campus.",
      img: "/images/kids-school (1).jpg"
    },
    {
      id: "block-b",
      name: "Block B",
      hub: "Excellence Hub",
      title: "Secondary Mastery",
      desc: "Rigorous preparation for Std 9–12 Board Exams with expert academic guidance.",
      img: "/images/proud-teacher-with-her-elementary-students (1).jpg"
    },
    {
      id: "block-c",
      name: "Block C",
      hub: "International Hub",
      title: "Bilingual Academy",
      desc: "Our premium dual-medium campus with global technology & sports infrastructure.",
      img: "/images/school3 (1).jpg"
    }
  ],
};

export async function getHomeContent() {
  await connectDB();

  let content = await HomeContent.findOne();

  // Seed default if empty
  if (!content) {
    content = await HomeContent.create(defaultHomeContent);
  }

  return content;
}

export async function updateHomeContent(data: Partial<IHomeContent>) {
  await connectDB();

  let content = await HomeContent.findOne();

  if (!content) {
    content = await HomeContent.create({ ...defaultHomeContent, ...data, updatedAt: new Date() });
  } else {
    Object.assign(content, data);
    content.updatedAt = new Date();
    await content.save();
  }

  return content;
}

export async function updateHeroSlides(slides: any[]) {
  await connectDB();

  let content = await HomeContent.findOne();
  if (!content) {
    content = await HomeContent.create({ ...defaultHomeContent, heroSlides: slides });
  } else {
    content.heroSlides = slides;
    content.updatedAt = new Date();
    await content.save();
  }

  return content;
}

export async function updateStats(stats: any[]) {
  await connectDB();

  let content = await HomeContent.findOne();
  if (!content) {
    content = await HomeContent.create({ ...defaultHomeContent, stats });
  } else {
    content.stats = stats;
    content.updatedAt = new Date();
    await content.save();
  }

  return content;
}

export async function updatePhilosophy(philosophy: any) {
  await connectDB();

  let content = await HomeContent.findOne();
  if (!content) {
    content = await HomeContent.create({ ...defaultHomeContent, philosophy });
  } else {
    content.philosophy = philosophy;
    content.updatedAt = new Date();
    await content.save();
  }

  return content;
}

export async function updateCampusHubs(campusHubs: any[]) {
  await connectDB();

  let content = await HomeContent.findOne();
  if (!content) {
    content = await HomeContent.create({ campusHubs });
  } else {
    content.campusHubs = campusHubs;
    content.updatedAt = new Date();
    await content.save();
  }

  return content;
}
