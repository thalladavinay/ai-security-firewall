import type { ReactNode } from "react";

interface UploadLayoutProps {
  children: ReactNode;
}

export default function UploadLayout({
  children,
}: UploadLayoutProps) {
  return <>{children}</>;
}