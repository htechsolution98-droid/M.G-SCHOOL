import connectDB from "@/lib/mongodb";
import EnrollmentFormConfig from "@/models/EnrollmentFormConfig";
import EnrollmentSubmission from "@/models/EnrollmentSubmission";

export async function getEnrollmentConfig() {
  await connectDB();
  let config = await EnrollmentFormConfig.findOne({});
  if (!config) {
    config = await EnrollmentFormConfig.create({
      title: "Enrollment Application",
      description: "Please fill out the form below to apply for enrollment.",
      fields: [
        { id: "studentName", label: "Student Full Name", type: "text", required: true },
        { id: "parentName", label: "Parent/Guardian Name", type: "text", required: true },
        { id: "email", label: "Email Address", type: "email", required: true },
        { id: "phone", label: "Phone Number", type: "tel", required: true },
        { id: "grade", label: "Applying for Grade", type: "select", required: true, options: ["Std 1", "Std 2", "Std 3", "Std 4", "Std 5", "Std 6", "Std 7", "Std 8", "Std 9", "Std 10", "Std 11", "Std 12"] },
      ]
    });
  }
  return config;
}

export async function updateEnrollmentConfig(data: any) {
  await connectDB();
  let config = await EnrollmentFormConfig.findOne({});
  if (!config) {
    config = new EnrollmentFormConfig(data);
  } else {
    config.title = data.title;
    config.description = data.description;
    config.fields = data.fields;
    config.updatedAt = new Date();
  }
  await config.save();
  return config;
}

export async function createEnrollmentSubmission(data: any) {
  await connectDB();
  const submission = await EnrollmentSubmission.create({ data });
  return submission;
}

export async function getAllEnrollmentSubmissions() {
  await connectDB();
  const submissions = await EnrollmentSubmission.find().sort({ createdAt: -1 });
  return submissions;
}

export async function deleteEnrollmentSubmission(id?: string) {
  await connectDB();
  if (id) {
    await EnrollmentSubmission.findByIdAndDelete(id);
  } else {
    await EnrollmentSubmission.deleteMany({});
  }
  return { success: true };
}

export async function updateEnrollmentSubmissionStatus(id: string, status: string) {
  await connectDB();
  const submission = await EnrollmentSubmission.findByIdAndUpdate(id, { status }, { new: true });
  return submission;
}
