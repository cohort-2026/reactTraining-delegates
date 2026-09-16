import { create } from "zustand";

// The search text stays in the URL (useSearchParams, Lab 6.2),
// so this store only needs the assignee filter.
type FilterStore = {
  assignee: string;
  setAssignee: (assignee: string) => void;
};

export const useFilterStore = create<FilterStore>()((set) => ({
  assignee: "",
  setAssignee: (assignee) => set({ assignee }),
}));
