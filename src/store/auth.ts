import { create } from 'zustand';
import Cookies from 'js-cookie';

type AuthStore = {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  token: Cookies.get('token-re') ?? null,
  setToken: (token) => {
    Cookies.set('token-re', token);
    set({ token });
  },
  logout: () => {
    Cookies.remove('token-re');
    set({ token: null });
  },
}));
