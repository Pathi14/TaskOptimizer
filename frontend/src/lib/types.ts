export type Status = {
  id: number;
  name: string;
  projectId: number;
};

export type Project = {
  id: number;
  title: string;
  description: string;
};

export type Task = {
  id: number;
  title: string;
  description?: string;
  priority?: number;
  endDate?: string;
  statusId: number;
  users: User[];
};

export type User = {
  id: number;
  name: string;
  email: string;
};
