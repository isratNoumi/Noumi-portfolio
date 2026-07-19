export type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: string;
  link?: string;
};

export type Achievement = {
  title: string;
  year: string;
  detail?: string;
};

export const PUBLICATIONS: Publication[] = [
  {
    title:
      "Towards Better Misogyny Detection in Bangla: Improved Dataset and Cutting-Edge Model Evaluation",
    authors: "Debopriya Deb Roy, Israt Moyeen Noumi, Md Aminur Rahman",
    venue:
      "6th International Conference on Sustainable Technologies for Industry 5.0 (STI), Dhaka",
    year: "Dec 2024",
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: "Dean's List of Honors",
    year: "2023",
    detail: "Bachelor of Science, AUST",
  },
];
