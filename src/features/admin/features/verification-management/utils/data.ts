import { GetVerificationDetailsResponseDTO, StatusCode, VerificationQueueItemDTO } from "../interfaces/interfaces";

export const DUMMY_QUEUE: VerificationQueueItemDTO[] = [
  {
    verificationId: "v001",
    user: { id: "u1", fullName: "Priya Sharma", email: "priya@example.com", profilePicture: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhUsAKLhCDqMIiEsf6rKN6t2Bs0E9YY74Ih11quBIVe4TqGeSpJDD4pXhst5jtgtKxktUuiUOu-pNCcUZa8jLI_w9fmn-Mm9Ig2JFEVcPcDdXzc2eXsCEQuV4OTuMoO2zlSN6k_oa9zSi0qx7cx5fX8DoB_0MmerAi7OUvi3rvWpSOD_iI12Xa50WmFrSEXgyBTktLrF4Knw2m-jzmJGmViAyKvrq1j4EBE1VjLMGVPzKQT95NWiu6ZaLfgi6HVpQ_ExEvNqHtS4Q" },
    documentType: { code: "PASSPORT", name: "Passport" },
    status: { code: "PENDING", name: "Pending" },
    submittedAt: new Date("2025-06-10T09:30:00"),
    assignedReviewer: null,
  },
  {
    verificationId: "v002",
    user: { id: "u2", fullName: "Raj Kumar", email: "raj@example.com", profilePicture: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhG41fO3j-O6UlTiMRQopM9A6CCFg1HdEX_8kCBTzKk_R_ked7ulHrG64Oj818g_P_um6FlfA9EBGNFMtJHDn5wQ9mfwzmH_gSdpRtWE0MlgR3QoXQT0hMVmI4aeDsVctpWyHpqBNCqRAWQ-C-3JQK7U04w3Cyb3JRj8NglxXtPyqAnGEM-miYLAshV9IEH5ueqOmwRAXcVsrV5vjA0bQbhE7GBVZ5emGyIpyxGR-n-5EdKAVx982gr5gwUA_O3h6IZuU044VG96o" },
    documentType: { code: "NATIONAL_ID", name: "National ID" },
    status: { code: "UNDER_REVIEW", name: "Under Review" },
    submittedAt: new Date("2025-06-09T14:15:00"),
    assignedReviewer: { id: "a1", fullName: "Admin Alex" },
  },
  {
    verificationId: "v003",
    user: { id: "u3", fullName: "Alex Rivera", email: "alex@example.com", profilePicture: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9Z7NYhi6KW_qOW2k8h4UeRtSPF_bIVCTsDTdhBB8CqYtmUZ0pxDgFjk6AzcZxMDOh5qpvtNTBZcFDaJrc9BwbfCXyAyMLY7NAdAiqDlvFh6IKCEmMjkRtFG1iDUkZerx_lCjC5EwL2c6PNVQ2ZWIZRoStux0JxXf77b8LqlZbyWdFhUKJEdjAj_e_nLqKt4KfvXdmBLkLduqhksMzPx2c5bG7_0cgkl8W3yGurwY4PMo_2Zj51OvxJkay6ENB1RjhryY-7vFgwKw" },
    documentType: { code: "DRIVERS_LICENSE", name: "Driver's License" },
    status: { code: "APPROVED", name: "Approved" },
    submittedAt: new Date("2025-06-08T11:00:00"),
    assignedReviewer: { id: "a1", fullName: "Admin Alex" },
  },
  {
    verificationId: "v004",
    user: { id: "u4", fullName: "Meera K.", email: "meera@example.com", profilePicture: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4mMklr-YWULEUQ10paNVHTDMTIZ-1ZRoEjhCX_0PBCELhZIpeKXkMijOZ4LWKr5YA4vD7Lsv1s-Y_45zjFWX45AgK9gwsIplrZAzBJ6C2HJ2LMnyrBdArGTL7OOUQvmod4bre4gbCln9sfyCSFzDOci07CBp19VEvzMUD53K7eZVBrfBxvEO9LM0eZNEP0GE_qqsvBukMrBF8nrTy-X3F4VD4-wfDFPZWDNrCMazfsVzCmpQPYY74fR3mbL4eGW4IIyFSyqSiYmY" },
    documentType: { code: "PASSPORT", name: "Passport" },
    status: { code: "REJECTED", name: "Rejected" },
    submittedAt: new Date("2025-06-07T16:45:00"),
    assignedReviewer: { id: "a2", fullName: "Admin Sam" },
  },
];

export const DUMMY_DETAIL: GetVerificationDetailsResponseDTO = {
  verificationId: "v001",
  user: {
    id: "u1",
    fullName: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 98765 43210",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhUsAKLhCDqMIiEsf6rKN6t2Bs0E9YY74Ih11quBIVe4TqGeSpJDD4pXhst5jtgtKxktUuiUOu-pNCcUZa8jLI_w9fmn-Mm9Ig2JFEVcPcDdXzc2eXsCEQuV4OTuMoO2zlSN6k_oa9zSi0qx7cx5fX8DoB_0MmerAi7OUvi3rvWpSOD_iI12Xa50WmFrSEXgyBTktLrF4Knw2m-jzmJGmViAyKvrq1j4EBE1VjLMGVPzKQT95NWiu6ZaLfgi6HVpQ_ExEvNqHtS4Q",
    joinedAt: new Date("2023-10-12"),
    accountAgeInDays: 596,
    isEmailVerified: true,
    isPhoneVerified: true,
    isIdVerified: false,
    country: "India",
  },
  verification: {
    status: { code: "PENDING", name: "Pending" },
    documentType: { code: "PASSPORT", name: "Passport" },
    submittedAt: new Date("2025-06-10T09:30:00"),
    reviewStartedAt: null,
    reviewedAt: null,
    reviewer: null,
    reviewNotes: null,
    rejectionReason: null,
    resubmissionReason: null,
  },
  documents: {
    front: { id: "d1", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdYfADuvgku28JUHeQ3ddlGEAR5zF_JnbNTox5G8_noofYa-RGAeQIQ9b9lZn8OQ_O4GSIDkwgKf1MGMvXjyDa6hFFATfrkPQ29bge-tdWB5Z-b_4HnBS_H5WdcdmorgEuF2rpaoqfXyrjc0IU49ratNE2FemBLK-qdClgHBFDFMb66d5nDzWRDmUwFNuPEeYjSv6n_I6K-u6OdmzxrEkQQdBj0prOGmF887b-p9G-oXVKE5V8iQcRhnS1bn8qYzU19MkknFNikrs", mimeType: "image/jpeg" },
    back: { id: "d2", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdYfADuvgku28JUHeQ3ddlGEAR5zF_JnbNTox5G8_noofYa-RGAeQIQ9b9lZn8OQ_O4GSIDkwgKf1MGMvXjyDa6hFFATfrkPQ29bge-tdWB5Z-b_4HnBS_H5WdcdmorgEuF2rpaoqfXyrjc0IU49ratNE2FemBLK-qdClgHBFDFMb66d5nDzWRDmUwFNuPEeYjSv6n_I6K-u6OdmzxrEkQQdBj0prOGmF887b-p9G-oXVKE5V8iQcRhnS1bn8qYzU19MkknFNikrs", mimeType: "image/jpeg" },
  },
  aiAnalysis: {
    overallRiskScore: 12,
    overallRiskLevel: "LOW",
    ocrConfidence: 97.3,
    checks: [
      { title: "Document Authenticity", status: "PASSED", message: "No signs of digital manipulation detected.", confidence: 98 },
      { title: "Face Match", status: "PASSED", message: "Profile photo matches document photo.", confidence: 94 },
      { title: "Expiry Date", status: "PASSED", message: "Document valid until 2031-08-12.", confidence: 100 },
      { title: "MRZ Integrity", status: "WARNING", message: "MRZ partially obscured — verify manually.", confidence: 72 },
      { title: "Blacklist Check", status: "PASSED", message: "Document number not found in blacklists.", confidence: 100 },
    ],
  },
  extractedData: {
    fullName: "PRIYA SHARMA",
    documentNumber: "J8234567",
    nationality: "INDIAN",
    gender: "F",
    dateOfBirth: new Date("1997-03-15"),
    issuingCountry: "INDIA",
  },
  timeline: [
    { id: "t1", title: "Verification submitted", description: "User submitted passport for verification.", createdAt: new Date("2025-06-10T09:30:00") },
    { id: "t2", title: "AI analysis completed", description: "Risk score: 12/100 (LOW). OCR confidence: 97.3%.", createdAt: new Date("2025-06-10T09:31:42") },
    { id: "t3", title: "Assigned to queue", description: "Awaiting manual review.", createdAt: new Date("2025-06-10T09:31:45") },
  ],
};
export  const STATUS_CFG: Record<StatusCode, { label: string; dot: string; badge: string }> = {
  PENDING: { label: "Pending", dot: "bg-amber-500", badge: "bg-amber-100 text-amber-700 border border-amber-200" },
  UNDER_REVIEW: { label: "Under Review", dot: "bg-blue-500", badge: "bg-blue-100 text-blue-700 border border-blue-200" },
  APPROVED: { label: "Approved", dot: "bg-[#005440]", badge: "bg-[#c9eadb] text-[#005440] border border-[#005440]/20" },
  REJECTED: { label: "Rejected", dot: "bg-[#ba1a1a]", badge: "bg-[#ffdad6] text-[#ba1a1a] border border-[#ba1a1a]/20" },
  RESUBMISSION_REQUIRED: { label: "Resubmit", dot: "bg-orange-500", badge: "bg-orange-100 text-orange-700 border border-orange-200" },
};


export const STATUS_FILTERS = [
  { value: "", label: "All" },
  { value: "PENDING", label: "Pending" },
  { value: "UNDER_REVIEW", label: "Under Review" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
  { value: "RESUBMISSION_REQUESTED", label: "Resubmit" },
];