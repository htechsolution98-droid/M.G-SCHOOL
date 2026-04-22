import connectDB from "@/lib/mongodb";
import GalleryContent from "@/models/GalleryContent";

const defaultGalleryContent = {
  categories: ["Campus Art", "Cultural Fest", "Academics", "Expeditions"],
  images: [
    { src: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80", category: "Campus Art", title: "Aerial View of Main Campus" },
    { src: "https://images.unsplash.com/photo-1577891772447-b31528753a9c?q=80", category: "Academics", title: "Chemistry Lab Discoveries" },
    { src: "https://images.unsplash.com/photo-1540575861501-7c00117fc24b?q=80", category: "Cultural Fest", title: "Annual Night Grand Finale" },
  ],
};

export async function getGalleryContent() {
  await connectDB();
  let content = await GalleryContent.findOne();
  if (!content) {
    content = await GalleryContent.create(defaultGalleryContent);
  }
  return content;
}

export async function updateGalleryCategories(categories: string[]) {
  await connectDB();
  let content = await GalleryContent.findOne();
  if (!content) {
    content = await GalleryContent.create({ ...defaultGalleryContent, categories });
  } else {
    content.categories = categories;
    content.updatedAt = new Date();
    await content.save();
  }
  return content;
}

export async function updateGalleryImages(images: any[]) {
  await connectDB();
  let content = await GalleryContent.findOne();
  if (!content) {
    content = await GalleryContent.create({ ...defaultGalleryContent, images });
  } else {
    content.images = images;
    content.updatedAt = new Date();
    await content.save();
  }
  return content;
}

export async function deleteGalleryContent() {
  await connectDB();
  return await GalleryContent.deleteMany({});
}
