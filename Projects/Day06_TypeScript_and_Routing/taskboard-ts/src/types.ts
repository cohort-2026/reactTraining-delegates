// src/types.ts
export type Status = "todo" | "doing" | "done";

export type Task = {
  id: string;
  title: string;
  assignee: string;
  points: number;
  status: Status;
  projectId: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
};

export type Product = {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
};

export type City = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

export type User = {
  name: string;
  email: string;
}