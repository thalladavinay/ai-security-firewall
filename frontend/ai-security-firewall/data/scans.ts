export const scans = [
  {
    id: "1",
    fileName: "invoice.pdf",
    status: "Safe",
    riskScore: 12,
    summary: "No significant threats found in the uploaded invoice.",
    scannedAt: "2026-07-21T09:45:00.000Z",
  },
  {
    id: "2",
    fileName: "presentation.pptx",
    status: "Warning",
    riskScore: 48,
    summary:
      "Potential prompt injection patterns were detected in embedded notes.",
    scannedAt: "2026-07-21T10:12:00.000Z",
  },
  {
    id: "3",
    fileName: "setup.exe",
    status: "Malicious",
    riskScore: 92,
    summary:
      "Multiple malware signatures and suspicious payload behavior were identified.",
    scannedAt: "2026-07-21T11:03:00.000Z",
  },
];