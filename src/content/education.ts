export type EducationItem = {
  institution: string;
  degree: string;
  period: string;
  location?: string;
  details?: string;
};

export const EDUCATION: EducationItem[] = [
  {
    institution: "Brac University",
    degree: "MSc. in Computer Science & Engineering",
    period: "2026 — Ongoing",
    location: "Dhaka, Bangladesh",
    details: "Advanced coursework in ML, distributed systems and applied AI.",
  },
  {
    institution: "Ahsanullah University of Science and Technology (AUST)",
    degree: "BSc. in Computer Science & Engineering",
    period: "2019 — 2023",
    location: "Dhaka, Bangladesh",
    details: "CGPA 3.834 · Dean's List of Honors, 2023.",
  },
];
