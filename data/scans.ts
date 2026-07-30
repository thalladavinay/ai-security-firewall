
import { ScanResult } from "@/types/scan";

export const scans: ScanResult[] = [
  {
    id: "1",
    filename: "invoice.pdf",
    fileType: "PDF",
    riskScore: 12,
    status: "Safe",
    threats: [],
    scanDate: "2026-07-21",
  },
  {
    id: "2",
    filename: "malware.exe",
    fileType: "Executable",
    riskScore: 95,
    status: "Danger",
    threats: [
      "Trojan",
      "Malware",
      "Suspicious API Calls",
    ],
    scanDate: "2026-07-20",
  },
  {
    id: "3",
    filename: "image.png",
    fileType: "Image",
    riskScore: 35,
    status: "Warning",
    threats: [
      "Hidden Metadata",
      "Suspicious Pattern",
    ],
    scanDate: "2026-07-19",
  },
];