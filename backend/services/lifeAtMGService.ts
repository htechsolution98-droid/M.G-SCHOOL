import connectDB from "@/lib/mongodb";
import LifeAtMGContent from "@/backend/models/LifeAtMGContent";

const defaultLifeAtMGContent = {
  hero: {
    heading: "Life at M.G. School",
    description: "A vibrant community where students learn, grow, and create memories that last a lifetime.",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070",
  },
  slider: [
    { url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80", type: "image", title: "Cultural Events" },
    { url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80", type: "image", title: "Sports Day" },
    { url: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80", type: "image", title: "Annual Gathering" },
  ],
};

export async function getLifeAtMGContent() {
  await connectDB();
  let content = await LifeAtMGContent.findOne();
  if (!content) {
    content = await LifeAtMGContent.create(defaultLifeAtMGContent);
  }
  return content;
}

export async function updateLifeAtMGHero(hero: any) {
  await connectDB();
  let content = await LifeAtMGContent.findOne();
  if (!content) {
    content = await LifeAtMGContent.create({ ...defaultLifeAtMGContent, hero });
  } else {
    content.hero = hero;
    content.updatedAt = new Date();
    await content.save();
  }
  return content;
}

export async function updateLifeAtMGSlider(slider: any[]) {
  await connectDB();
  let content = await LifeAtMGContent.findOne();
  if (!content) {
    content = await LifeAtMGContent.create({ ...defaultLifeAtMGContent, slider });
  } else {
    content.slider = slider;
    content.updatedAt = new Date();
    await content.save();
  }
  return content;
}

export async function deleteLifeAtMGContent() {
  await connectDB();
  return await LifeAtMGContent.deleteMany({});
}
