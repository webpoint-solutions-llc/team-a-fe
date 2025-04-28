export interface IProjectDocument {
  id: string;
  title: string;
  description: string;
  link: string;
  tags: string;
  visibility: "private" | "public";
  createdById: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: {
    name: string;
  };
  createdBy: {
    id: string;
    fullName: string;
  };
}
