import connectDB from "@/lib/mongodb";
import TrusteeContent from "@/backend/models/TrusteeContent";

export async function getTrusteesContent() {
  await connectDB();
  let doc = await TrusteeContent.findOne();
  if (!doc) {
    doc = await TrusteeContent.create({});
  }
  return doc;
}

export async function updateTrusteesContent(data: any) {
  await connectDB();
  let doc = await TrusteeContent.findOne();
  if (!doc) {
    doc = await TrusteeContent.create(data);
  } else {
    // Remove _id and __v if they exist to avoid immutable field errors
    const { _id, __v, ...updateData } = data;
    Object.assign(doc, updateData);
    doc.updatedAt = new Date();
    await doc.save();
  }
  return doc;
}
