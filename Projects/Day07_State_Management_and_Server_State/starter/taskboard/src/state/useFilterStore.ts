import { create } from "zustand";

type FilterStore = {
  assignee: string;
  setAssignee: (assignee: string) => void;
};

export const useFilterStore = create<FilterStore>()((set) => ({
  assignee: "",
  setAssignee: (assignee) => set({ assignee }),
}));
