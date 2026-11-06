import connectDB from "@/lib/mongodb";
import HeaderConfig from "@/backend/models/HeaderConfig";

export const defaultHeaderConfig = {
  admissionButton: {
    isVisible: true,
    text: "Admission-open 2027-28",
    link: "https://docs.google.com/forms/d/e/1FAIpQLScvDLrOCqRksq57FNC4asJ4uY3RX9hV4KVaJGfJSgHXTldrRw/viewform?usp=publish-editor",
    openInNewTab: true,
    badgeText: "",
  },
};

export async function getHeaderConfig() {
  await connectDB();
  let doc = await HeaderConfig.findOne();
  if (!doc) {
    doc = await HeaderConfig.create(defaultHeaderConfig);
  }
  return doc;
}

export async function updateHeaderConfig(data: any) {
  await connectDB();
  let doc = await HeaderConfig.findOne();
  const incomingAdmission = data.admissionButton || data;
  if (!doc) {
    doc = await HeaderConfig.create({
      admissionButton: {
        ...defaultHeaderConfig.admissionButton,
        ...incomingAdmission,
      },
    });
  } else {
    const existing = doc.admissionButton
      ? typeof (doc.admissionButton as any).toObject === "function"
        ? (doc.admissionButton as any).toObject()
        : doc.admissionButton
      : defaultHeaderConfig.admissionButton;

    doc.admissionButton = {
      ...existing,
      ...incomingAdmission,
    };
    doc.updatedAt = new Date();
    await doc.save();
  }
  return doc;
}
