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
};

export async function getAboutContent() {
  await connectDB();

  let content = await AboutContent.findOne();

  // Seed default if empty
  if (!content) {
    content = await AboutContent.create(defaultAboutContent);
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
