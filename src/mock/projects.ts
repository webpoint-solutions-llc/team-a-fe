import { ProjectStatus, type IProject } from "@/types/project"; // adjust the path based on your project structure

export const mockProjects: IProject[] = Array.from({ length: 20 }, (_, i) => ({
  id: `project-${i + 1}`,
  title: `Project ${i + 1} - ${generateRandomTitle()}`,
  description: Math.random() > 0.3 ? generateRandomDescription() : null,
  kickoffDate: randomPastDate(),
  deadline: randomFutureDate(),
  status: randomStatus(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  projectRoles: [],
  projectMembers: [],
  documentCategories: [],
}));

// Utility functions

function generateRandomTitle(): string {
  const keywords = [
    "Apollo",
    "Nova",
    "Quantum",
    "Vertex",
    "Horizon",
    "Nexus",
    "Vortex",
    "Momentum",
    "Eclipse",
    "Odyssey",
  ];
  const random = keywords[Math.floor(Math.random() * keywords.length)];
  return `${random} Initiative`;
}

function generateRandomDescription(): string {
  const descriptions = [
    "This project aims to redefine the industry standards.",
    "Focused on delivering cutting-edge solutions.",
    "An experimental project exploring new paradigms.",
    "Designed to scale rapidly with market demands.",
    "Collaborative initiative across multiple sectors.",
    "Research-focused with potential for groundbreaking discoveries.",
    "A client-driven project emphasizing user experience.",
    "Internal tool development for organizational efficiency.",
    "An ambitious leap towards digital transformation.",
    "A legacy system modernization effort.",
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

function randomStatus(): ProjectStatus {
  const statuses = [
    ProjectStatus.Active,
    ProjectStatus.Completed,
    ProjectStatus.Archived,
  ];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

function randomPastDate(): string {
  const date = new Date();
  date.setMonth(date.getMonth() - Math.floor(Math.random() * 12)); // up to 12 months ago
  return date.toISOString();
}

function randomFutureDate(): string {
  const date = new Date();
  date.setMonth(date.getMonth() + (6 + Math.floor(Math.random() * 12))); // 6–18 months in future
  return date.toISOString();
}
