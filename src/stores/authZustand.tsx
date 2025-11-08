
import { create } from "zustand";

type AuthState = {
  token: string | null; //token state
  login: (username: string, password: string) => Promise<void>; //method to login
  logout: () => void; //logout method
};


export const useAuth = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  login: async () => {
    // 假登录，正常项目这里调后端
    await new Promise((r) => setTimeout(r, 300));
    const tk = "demo-token";
    localStorage.setItem("token", tk);
    set({ token: tk });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ token: null });
  },
}));
