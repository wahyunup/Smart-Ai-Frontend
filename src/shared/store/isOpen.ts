import { create } from "zustand";

interface toogleProps {
  isOpen: boolean;
  setIsOpen: () => void;
}
const useToggle = create<toogleProps>((set) => ({
  isOpen: false,
  setIsOpen: () => set ((state) => ({ isOpen: !state.isOpen })),
}));

export default useToggle;
