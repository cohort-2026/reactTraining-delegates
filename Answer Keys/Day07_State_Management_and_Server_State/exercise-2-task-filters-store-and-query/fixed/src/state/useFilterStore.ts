import { create } from "zustand";
import type { StatusFilter } from "../api/tasks";

type FilterStore = {
  status: StatusFilter;
  setStatus: (status: StatusFilter) => void;
};

export const useFilterStore = create<FilterStore>()((set) => ({
  status: "all",
  setStatus: (status) => set({ status }),
}));
