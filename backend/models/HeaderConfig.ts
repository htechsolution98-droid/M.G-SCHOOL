import mongoose, { Schema, Document } from "mongoose";

export interface IAdmissionButton {
  isVisible: boolean;
  text: string;
  link: string;
  openInNewTab: boolean;
  badgeText?: string;
}

export interface IHeaderConfig extends Document {
  admissionButton: IAdmissionButton;
  updatedAt: Date;
}

const AdmissionButtonSchema = new Schema<IAdmissionButton>(
  {
    isVisible: { type: Boolean, default: true },
    text: { type: String, default: "Admission-open 2027-28" },
    link: {
      type: String,
      default:
        "https://docs.google.com/forms/d/e/1FAIpQLScvDLrOCqRksq57FNC4asJ4uY3RX9hV4KVaJGfJSgHXTldrRw/viewform?usp=publish-editor",
    },
    openInNewTab: { type: Boolean, default: true },
    badgeText: { type: String, default: "" },
  },
  { _id: false }
);

const HeaderConfigSchema = new Schema<IHeaderConfig>({
  admissionButton: {
    type: AdmissionButtonSchema,
    default: () => ({
      isVisible: true,
      text: "Admission-open 2027-28",
      link: "https://docs.google.com/forms/d/e/1FAIpQLScvDLrOCqRksq57FNC4asJ4uY3RX9hV4KVaJGfJSgHXTldrRw/viewform?usp=publish-editor",
      openInNewTab: true,
      badgeText: "",
    }),
  },
  updatedAt: { type: Date, default: Date.now },
});

if (mongoose.models && mongoose.models.HeaderConfig) {
  delete mongoose.models.HeaderConfig;
}

export default mongoose.model<IHeaderConfig>("HeaderConfig", HeaderConfigSchema);

