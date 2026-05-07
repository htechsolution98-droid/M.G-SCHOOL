import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mg_school_fallback_secret";

export async function loginAdmin(email: string, password: string) {
  await connectDB();

  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    { id: admin._id, email: admin.email, role: admin.role },
    JWT_SECRET,
    { expiresIn: "24h" }
  );

  return {
    token,
    admin: {
      email: admin.email,
      name: admin.name,
      role: admin.role,
    },
  };
}

export async function seedAdmin() {
  await connectDB();

  const existingAdmin = await Admin.findOne({ email: "admin@gmail.com" });
  if (existingAdmin) {
    return { message: "Admin user already exists", exists: true };
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("12345", salt);

  const admin = await Admin.create({
    email: "admin@gmail.com",
    password: hashedPassword,
    name: "Administrator",
    role: "admin",
  });

  return {
    message: "Admin user created successfully",
    admin: { email: admin.email, name: admin.name },
  };
}
