import { Routes, Route, Link, Navigate } from "react-router-dom";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
// import TaskDetail from "./pages/TaskDetail";
import type { JSX } from "react";
// import { useAuthCtx } from "./auth-context";
import { useAuth } from "./stores/authZustand";

// Private 组件的作用是保护其子组件，
// 只有在用户通过身份验证后才能访问这些子组件。
// 如果用户未通过身份验证，Private 组件会将用户重定向到登录页面。

//props 的结构必须是一个对象，这个对象里有一个键叫 children，
// 它的值必须是 一个 JSX 元素。
function Private({ children }: { children: JSX.Element }) {
  //const { token } = useAuthCtx();
  const authed = !!useAuth(s => s.token);
  return authed ? children : <Navigate to="/login" replace />;
}

export default function App() {
  // const { token, logout } = useAuthCtx();
  const token = useAuth(s => s.token);
  const logout = useAuth(s => s.logout);

  return (
    <div style={{
      maxWidth: 860,
      margin: "0 auto",
      padding: 16
    }}>
      <nav style={{ display: "flex", gap: 16, marginBottom: 12, alignItems: "center" }}>
        <Link to="/tasks">タスク</Link>
        <Link to="/settings">设置</Link>
        <div style={{ marginLeft: "auto" }}>
          {token ? (<button onClick={logout}>ログアウト</button>) : (<Link to="/login">ログイン</Link>)}
        </div>
      </nav>
 
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<Private><Tasks /></Private>} />
        {/* <Route path="/tasks/:id" element={<Private><TaskDetail /></Private>} /> */}
        <Route path="/settings" element={<Private><Settings /></Private>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>

    
  );
}
