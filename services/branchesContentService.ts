import connectDB from "@/lib/mongodb";
import BranchesContent, { IBranchesContent } from "@/models/BranchesContent";

const defaultBranchesContent = {
  hero: {
    heading: "Distributed ",
    headingHighlight: "Excellence.",
    description: "Three distinct campuses, one unified vision of nurturing tomorrow's leaders.",
  },
  branchesList: [
    {
      id: "block-a",
      name: "Block A",
      subtitle: "The Foundation Campus",
      grades: "Std 1–8",
      medium: "Gujarati Medium",
      location: "East Campus, MG Road",
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80",
    },
    {
      id: "block-b",
      name: "Block B",
      subtitle: "The Academic Center",
      grades: "Std 9–12",
      medium: "Gujarati Medium",
      location: "West Campus, Scholars Lane",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80",
    },
    {
      id: "block-c",
      name: "Block C",
      subtitle: "The International Hub",
      grades: "Std 1–12",
      medium: "English & Gujarati Medium",
      location: "Central Hub, Education Square",
      image: "https://images.unsplash.com/photo-1523050853063-bd40d04b68ce?q=80",
    },
  ],
  blockA: {
    name: "Block A",
    subtitle: "The Foundation Campus",
    grades: "Std 1–8",
    medium: "Gujarati Medium",
    description: "Our vibrant foundation hub focuses on building character and core academic skills through activity-based learning in our native tongue.",
    images: ["https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80"],
    location: "East Campus, MG Road",
    principal: "Dr. Rajesh Shah",
    specialties: ["Smart Classrooms", "Vedic Math", "Moral Education", "Vibrant Playgrounds"],
  },
  blockB: {
    name: "Block B",
    subtitle: "The Academic Center",
    grades: "Std 9–12",
    medium: "Gujarati Medium",
    description: "A focused academic environment designed for rigorous board preparation and career readiness.",
    images: ["https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80"],
    location: "West Campus, Scholars Lane",
    principal: "Mrs. Anjali Desai",
    specialties: ["Science Labs", "Career Counseling", "Digital Library", "Sports Complex"],
  },
  blockC: {
    name: "Block C",
    subtitle: "The International Hub",
    grades: "Std 1–12",
    medium: "English & Gujarati Medium",
    description: "A modern facility blending state-board rigor with international perspectives and dual-medium instruction.",
    images: ["https://images.unsplash.com/photo-1523050853063-bd40d04b68ce?q=80"],
    location: "Central Hub, Education Square",
    principal: "Mr. Vikram Mehta",
    specialties: ["Robotics Lab", "Foreign Languages", "Global Exchange", "Performing Arts"],
  }
};

export async function getBranchesContent() {
  await connectDB();
  let content = await BranchesContent.findOne();
  if (!content) {
    content = await BranchesContent.create(defaultBranchesContent);
  }
  return content;
}

export async function updateBranchesHero(hero: any) {
  await connectDB();
  let content = await BranchesContent.findOne();
  if (!content) {
    content = await BranchesContent.create({ ...defaultBranchesContent, hero });
  } else {
    content.hero = hero;
    content.updatedAt = new Date();
    await content.save();
  }
  return content;
}

export async function updateBranchesList(branchesList: any[]) {
  await connectDB();
  let content = await BranchesContent.findOne();
  if (!content) {
    content = await BranchesContent.create({ ...defaultBranchesContent, branchesList });
  } else {
    content.branchesList = branchesList;
    content.updatedAt = new Date();
    await content.save();
  }
  return content;
}

export async function updateBlockContent(blockKey: "blockA" | "blockB" | "blockC", blockData: any) {
  await connectDB();
  let content = await BranchesContent.findOne();
  if (!content) {
    content = await BranchesContent.create({ ...defaultBranchesContent, [blockKey]: blockData });
  } else {
    content[blockKey] = blockData;
    content.markModified(blockKey);
    content.updatedAt = new Date();
    await content.save();
  }
  return content;
}
export async function deleteBranchesContent() {
  await connectDB();
  return await BranchesContent.deleteMany({});
}
