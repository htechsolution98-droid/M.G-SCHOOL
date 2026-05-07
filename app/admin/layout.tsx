import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel | M.G. School",
  description: "M.G. School Administration Dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      {children}
    </div>
  );
}
