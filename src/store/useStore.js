import { create } from "zustand";

const useStore = create((set) => ({
  buttonValue: "출결상태 출력",
  setButtonValue: (newValue) => set({ buttonValue: newValue }),
}));

export default useStore;
