import React, { useState, useMemo,useContext } from "react";

type AuthState = {
  token: string | null; //token state
  login: (username: string, password: string) => Promise<void>; //method to login
  logout: () => void; //logout method
};

//React Contextで管理する場合
const AuthContext = React.createContext<AuthState | null>(null);

type Props = { children: React.ReactNode };

export function AuthProvider({ children }: Props) {
  // const { children } = props;
  // hook
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const login = async (username: string, password: string) => {
    // 假登录，正常项目这里调后端
    await new Promise((r) => setTimeout(r, 300));
    const tk = "demo-token";
    localStorage.setItem("token", tk);
    setToken(tk);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  //>>>> 性能优化，避免每次渲染都创建新对象
  const value = useMemo(() => ({ token, login, logout }), [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthCtx() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthCtx must be used within <AuthProvider>");
  return ctx;
}