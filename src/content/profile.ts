import type { LucideIcon } from "lucide-react";
import { Github, Linkedin, Mail, FileDown } from "lucide-react";

export type Social = {
  label: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
};

// NOTE: LinkedIn URL is a best-guess based on GitHub handle — update if incorrect.
export const SOCIALS: Social[] = [
  {
    label: "GitHub",
    href: "https://github.com/isratNoumi",
    icon: Github,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/isratnoumi/",
    icon: Linkedin,
    external: true,
  },
  {
    label: "Email",
    href: "mailto:isratmoyeen.23@gmail.com",
    icon: Mail,
  },
  {
    label: "Resume",
    href: "/resume.pdf",
    icon: FileDown,
    external: true,
  },
];

export const PROFILE = {
  name: "Israt Moyeen Noumi",
  handle: "Noumi",
  tagline: "Full-Stack & AI Engineer",
  location: "Dhaka, Bangladesh",
  email: "isratmoyeen.23@gmail.com",
  phone: "+880 1845 517840",
  availability: "Open to new opportunities",
  // Drop your real photo into /public as profile.jpg (or .png/.webp)
  // and update this path. Falls back to the SVG placeholder shipped in /public.
  avatar: "/1784448120160.jpg",
  avatarFallback: "/profile.svg",
};
