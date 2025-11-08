import React, { useState, useMemo } from "react";

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
  // 依赖数组token变化时才重新创建value对象
  // 这样使用useMemo可以避免不必要的子组件重新渲染
  // 因为如果不使用useMemo，每次AuthProvider渲染都会创建一个新的value对象
  // 导致所有使用AuthContext的子组件都重新渲染，即使token没有变化
  // 使用useMemo后，只有当token变化时才会创建新的value对象
  // 这样可以提高性能，避免不必要的渲染
  // 当然，如果login和logout函数也会变化，可以把它们也放到依赖数组中
  // 但在这个例子中，它们是不会变化的，所以只需要关注token即可

  // ({ token, login, logout }) 等同于 return { token, login, logout }
  const value = useMemo(() => ({ token, login, logout }), [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthCtx() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthCtx must be used within an AuthProvider");
  }
  return ctx;
}
