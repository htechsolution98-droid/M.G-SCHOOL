import connectDB from "@/lib/mongodb";
import AboutContent, { IAboutContent } from "@/models/AboutContent";

const defaultAboutContent = {
  hero: {
    image: "https://images.unsplash.com/photo-1523050853063-bd40d04b68ce?q=80&w=2070",
    heading: "Our Journey of ",
    headingHighlight: "Success.",
    description: "Three decades of academic excellence, carving a legacy that inspires generations.",
  },
  legacy: {
    headingPrefix: "Founded on ",
    headingHighlight: "Vision.",
    paragraphs: [
      "Established in 1995, M.G. School emerged from a simple yet profound dream: to provide world-class education that respects local roots while embracing global growth.",
      "What began in a modest building with 50 students has now evolved into a multi-campus educational beacon, nurturing thousands of bright minds every year.",
    ],
    stat1Value: "28+",
    stat1Label: "Years Legacy",
    stat2Value: "15k",
    stat2Label: "Alumni Globally",
    archiveYear: "Archive 1995",
    archiveTitle: "The First Foundation.",
    imageMain: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80",
    imageSmall1: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
    imageSmall2: "https://images.unsplash.com/photo-1577891772447-b31528753a9c",
  },
  excellence: [
    {
      title: "Our Mission",
      description: "To provide a nurturing environment where students are inspired to achieve academic excellence and develop into compassionate leaders.",
      image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80",
    },
    {
      title: "Our Vision",
      description: "To be a global leader in education, fostering innovation, integrity, and a lifelong passion for learning in every student.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80",
    },
    {
      title: "Core Values",
      description: "Integrity, Respect, Excellence, and Inclusivity are the pillars that guide every interaction and decision at M.G. School.",
      image: "https://images.unsplash.com/photo-1577891772447-b31528753a9c?q=80",
    },
  ],
  valuesScroll: {
    heading: "Every Child, ",
    headingHighlight: "Every Future.",
    description: "\"Our commitment is to the unique potential within every student.\"",
    features: [
      { title: "Immersive Digital Classrooms", image: "" },
      { title: "Holistic Character Building", image: "" },
      { title: "Global Athletic Exposure", image: "" },
      { title: "Creative & Performing Arts", image: "" },
      { title: "Ethics-Driven Education", image: "" },
      { title: "Sustainable Campus Living", image: "" },
      { title: "Peer-to-Peer Mentorship", image: "" },
      { title: "International Exchange", image: "" }
    ]
  }
};

export async function getAboutContent() {
  await connectDB();
  let content = await AboutContent.findOne();
  if (!content) {
    content = await AboutContent.create(defaultAboutContent);
  } else if (!content.excellence || content.excellence.length === 0) {
    content.excellence = defaultAboutContent.excellence as any;
    await content.save();
  }
  return content;
}

export async function updateAboutHero(hero: any) {
  await connectDB();
  let content = await AboutContent.findOne();
  if (!content) {
    content = await AboutContent.create({ ...defaultAboutContent, hero });
  } else {
    content.hero = hero;
    content.updatedAt = new Date();
    await content.save();
  }
  return content;
}

export async function updateAboutLegacy(legacy: any) {
  await connectDB();
  let content = await AboutContent.findOne();
  if (!content) {
    content = await AboutContent.create({ ...defaultAboutContent, legacy });
  } else {
    content.legacy = legacy;
    content.updatedAt = new Date();
    await content.save();
  }
  return content;
}

export async function updateAboutExcellence(excellence: any[]) {
  await connectDB();
  let content = await AboutContent.findOne();
  if (!content) {
    content = await AboutContent.create({ ...defaultAboutContent, excellence });
  } else {
    content.excellence = excellence;
    content.updatedAt = new Date();
    await content.save();
  }
  return content;
}

export async function updateAboutValuesScroll(valuesScroll: any) {
  await connectDB();
  let content = await AboutContent.findOne();
  if (!content) {
    content = await AboutContent.create({ ...defaultAboutContent, valuesScroll });
  } else {
    content.valuesScroll = valuesScroll;
    content.updatedAt = new Date();
    await content.save();
  }
  return content;
}
