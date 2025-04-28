// enums
export enum ProjectStatus {
  Active = "active",
  Completed = "completed",
  Archived = "archived",
}

// models
export interface IUser {
  id: string;
  fullName: string;
  email: string;
  password: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  projectMembers: IProjectMember[];
  documents: Document[];
  documentPermissions: IDocumentPermission[];
}

export interface IProject {
  id: string;
  title: string;
  description?: string | null;
  kickoffDate: string;
  deadline: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  projectRoles: IProjectRole[];
  projectMembers: IProjectMember[];
  documentCategories: IDocumentCategory[];
}

export interface IProjectRole {
  id: string;
  name: string;
  projectId: string;
  project: IProject;
  projectMembers: IProjectMember[];
}

export interface IProjectMember {
  id: string;
  userId: string;
  projectId: string;
  roleId: string;
  addedAt: string;
  user: IUser;
  project: IProject;
  role: IProjectRole;
}

export interface IDocumentCategory {
  id: string;
  name: string;
  description?: string | null;
  projectId: string;
  project: IProject;
  documents: Document[];
}

export interface IDocument {
  id: string;
  title: string;
  description?: string | null;
  link: string;
  tags?: string | null; // stored as comma-separated string
  visibility: "public" | "private";
  createdById: string;
  createdBy: IUser;
  categoryId: string;
  category: IDocumentCategory;
  createdAt: string;
  updatedAt: string;
  permissions: IDocumentPermission[];
}

export interface IDocumentPermission {
  id: string;
  documentId: string;
  userId: string;
  document: Document;
  user: IUser;
}
