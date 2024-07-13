import { create } from 'zustand';

type Hide = {
    isHide: boolean;
    activeSideBar: string;
    setActiveSideBar: (activeSideBar: string) => void;
    setHide: () => void;
};

const useHide = create<Hide>()((set) => ({
    isHide: false,
    activeSideBar: '/dashboard',
    setHide: () => set((state) => ({ isHide: !state.isHide })),
    setActiveSideBar: (activeSideBar) => set({ activeSideBar }),
}));

export default useHide;
