import { http, HttpResponse } from "msw";
import { API_URL } from "../api";
import type { Task } from "../types";

export const testTasks: Task[] = [
  { id: "1", title: "Plan the sprint", status: "todo", points: 3 },
  { id: "2", title: "Build the board", status: "doing", points: 5 },
];

export const handlers = [
  http.get(`${API_URL}/tasks`, () => HttpResponse.json(testTasks)),
];
