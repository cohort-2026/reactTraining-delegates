import { create } from "zustand";

type FilterStore = {
  searchText: string;
  setSearchText: (searchText: string) => void;
  assignee: string;
  setAssignee: (assignee: string) => void;
};

export const useFilterStore = create<FilterStore>()((set) => ({
  searchText: "",
  setSearchText: (searchText) => set({ searchText }),
  assignee: "",
  setAssignee: (assignee) => set({ assignee }),
}));
