export interface VerificationQueueItemDTO {
  verificationId: string;
  user: { id: string; fullName: string; email: string; profilePicture: string | null };
  documentType: { code: string; name: string };
  status: { code: string; name: string };
  submittedAt: Date;
  assignedReviewer: { id: string; fullName: string } | null;
}

export interface GetVerificationQueueResponseDTO {
  items: VerificationQueueItemDTO[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

export interface VerificationUserDTO {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  avatarUrl: string | null;
  joinedAt: Date;
  accountAgeInDays: number;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isIdVerified: boolean;
  country: string | null;
}

export interface VerificationSummaryDTO {
  status: { code: string; name: string };
  documentType: { code: string; name: string };
  submittedAt: Date;
  reviewStartedAt: Date | null;
  reviewedAt: Date | null;
  reviewer: { id: string; fullName: string } | null;
  reviewNotes: string | null;
  rejectionReason: string | null;
  resubmissionReason: string | null;
}

export interface VerificationDocumentItemDTO {
  id: string;
  imageUrl: string;
  mimeType: string;
}
export interface VerificationDocumentsDTO {
  front: VerificationDocumentItemDTO | null;
  back: VerificationDocumentItemDTO | null;
}

export interface VerificationAiCheckDTO {
  title: string;
  status: "PASSED" | "FAILED" | "WARNING";
  message: string;
  confidence?: number;
}
export interface VerificationAiAnalysisDTO {
  overallRiskScore: number | null;
  overallRiskLevel: "LOW" | "MEDIUM" | "HIGH" | null;
  ocrConfidence: number | null;
  checks: VerificationAiCheckDTO[];
}

export interface VerificationExtractedDataDTO {
  fullName?: string | null;
  documentNumber?: string | null;
  nationality?: string | null;
  gender?: string | null;
  dateOfBirth?: Date | null;
  issuingCountry?: string | null;
}

export interface VerificationTimelineItemDTO {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
}

export interface GetVerificationDetailsResponseDTO {
  verificationId: string;
  user: VerificationUserDTO;
  verification: VerificationSummaryDTO;
  documents: VerificationDocumentsDTO;
  aiAnalysis: VerificationAiAnalysisDTO;
  extractedData: VerificationExtractedDataDTO;
  timeline: VerificationTimelineItemDTO[];
}

export type StatusCode = "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "RESUBMISSION_REQUIRED" ;

export interface VerificationParams {
  tab: StatusCode;
  page: number;
  limit: number;
  search?: string;
}