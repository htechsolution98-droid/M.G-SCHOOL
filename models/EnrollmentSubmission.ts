import mongoose, { Schema, Document } from "mongoose";

export interface IEnrollmentSubmission extends Document {
  data: Record<string, any>;
  status: string; // e.g. "Pending", "Reviewed", "Accepted", "Rejected"
  createdAt: Date;
}

const EnrollmentSubmissionSchema = new Schema<IEnrollmentSubmission>({
  data: { type: Schema.Types.Mixed, required: true },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

if (mongoose.models.EnrollmentSubmission) {
  delete mongoose.models.EnrollmentSubmission;
}

export default mongoose.model<IEnrollmentSubmission>("EnrollmentSubmission", EnrollmentSubmissionSchema);
