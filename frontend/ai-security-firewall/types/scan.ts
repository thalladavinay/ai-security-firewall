/*export type ScanStatus = 'Safe' | 'Warning' | 'Malicious'

export interface ScanResult {
  id: string
  fileName: string
  status: ScanStatus
  riskScore: number
  summary?: string
  threatSummary?: string
  scannedAt: string
}

export interface ScanRequest {
  fileName: string
  fileType: string
  content?: string
}

export interface RecentScan {
  fileName: string
  status: ScanStatus
  score: number
  scannedAt: string
}
*/
export interface ScanResult {
  id: string;
  filename: string;
  fileType: string;
  riskScore: number;
  status: "Safe" | "Warning" | "Danger";
  threats: string[];
  scanDate: string;
}