import { create } from 'zustand';

interface UserState {
  userInfo: any | null;
  setUserInfo: (info: any) => void;
  clearUserInfo: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => set({ userInfo }),
  clearUserInfo: () => set({ userInfo: null }),
}));
