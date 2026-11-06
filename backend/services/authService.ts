import connectDB from "@/lib/mongodb";
import Admin from "@/backend/models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mg_school_fallback_secret";

export async function loginAdmin(email: string, password: string) {
  await connectDB();

  const cleanEmail = (email || "").trim();
  const cleanPassword = (password || "").trim();

  // Find admin case-insensitively
  let admin = await Admin.findOne({
    email: { $regex: new RegExp(`^${cleanEmail}$`, "i") },
  });

  // If no admin exists in DB at all, auto-seed default admin
  if (!admin) {
    const totalAdmins = await Admin.countDocuments();
    if (totalAdmins === 0 && cleanEmail.toLowerCase() === "admin@gmail.com") {
      await seedAdmin();
      admin = await Admin.findOne({ email: "admin@gmail.com" });
    }
  }

  if (!admin) {
    throw new Error("Invalid email or password");
  }

  let isMatch = false;
  try {
    isMatch = await bcrypt.compare(cleanPassword, admin.password);
  } catch (err) {
    isMatch = false;
  }

  // Fallback for plain text password upgrade
  if (!isMatch && cleanPassword === admin.password) {
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(cleanPassword, salt);
    await admin.save();
    isMatch = true;
  }

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

export async function requestPasswordReset(email: string) {
  await connectDB();

  const cleanEmail = (email || "").trim();
  if (!cleanEmail) {
    throw new Error("Email address is required");
  }

  // Find admin case-insensitively
  let admin = await Admin.findOne({
    email: { $regex: new RegExp(`^${cleanEmail}$`, "i") },
  });

  // If no admin exists at all, auto-seed default admin
  if (!admin) {
    const totalAdmins = await Admin.countDocuments();
    if (totalAdmins === 0 && cleanEmail.toLowerCase() === "admin@gmail.com") {
      await seedAdmin();
      admin = await Admin.findOne({ email: "admin@gmail.com" });
    }
  }

  if (!admin) {
    throw new Error("No admin account found with this email address.");
  }

  // Generate 6-digit numeric OTP verification code
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes validity

  admin.resetPasswordToken = resetCode;
  admin.resetPasswordExpires = expires;
  await admin.save();

  return {
    success: true,
    message: "Verification code generated successfully.",
    email: admin.email,
    code: resetCode, // Returned for instant on-screen display / verification
    expiresAt: expires.toISOString(),
  };
}

export async function resetPassword(email: string, code: string, newPassword: string) {
  await connectDB();

  const cleanEmail = (email || "").trim();
  const cleanCode = (code || "").trim();
  const cleanPassword = (newPassword || "").trim();

  if (!cleanEmail || !cleanCode || !cleanPassword) {
    throw new Error("Email, verification code, and new password are required.");
  }

  if (cleanPassword.length < 4) {
    throw new Error("Password must be at least 4 characters long.");
  }

  const admin = await Admin.findOne({
    email: { $regex: new RegExp(`^${cleanEmail}$`, "i") },
    resetPasswordToken: cleanCode,
    resetPasswordExpires: { $gt: new Date() },
  });

  if (!admin) {
    throw new Error("Invalid or expired verification code. Please request a new code.");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(cleanPassword, salt);

  admin.password = hashedPassword;
  admin.resetPasswordToken = "";
  admin.resetPasswordExpires = undefined;
  await admin.save();

  return {
    success: true,
    message: "Password has been successfully updated. You can now login with your new password.",
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
