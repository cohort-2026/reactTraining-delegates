import { create } from "zustand";

type FilterStore = {
  search: string;
  assignee: string;
  setSearch: (search: string) => void;
  setAssignee: (assignee: string) => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
  search: "",
  assignee: "",

  setSearch: (search) => set({ search }),
  setAssignee: (assignee) => set({ assignee }),
}));
