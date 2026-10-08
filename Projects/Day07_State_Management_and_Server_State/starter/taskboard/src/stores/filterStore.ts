import { create } from "zustand";

type FilterState = {
  assignee: string;
  setAssignee: (assignee: string) => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  assignee: "",
  setAssignee: (assignee) => set({ assignee }),
}));
