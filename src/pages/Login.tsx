import { useForm } from "react-hook-form";
import { useAuth } from "../stores/authZustand";
// import { useAuthCtx } from "../auth-context";
import { useNavigate } from "react-router-dom";
import { use } from "react";

export default function Login() {
  const { register, handleSubmit } = useForm<{  username: string; password: string }>();
  // const {login} = useAuthCtx();
  const login = useAuth(s => s.login);
  const nav = useNavigate();


  return (
    <form
      onSubmit={handleSubmit(async ({ username, password }) => {
        await login(username, password);
        nav("/tasks");
      })}
    >
      <h1>登录</h1>
      {/* {...  */}
      <input placeholder="用户名" {...register("username")} />
      <input type="password" placeholder="密码" {...register("password")} />
      <button type="submit">登录</button>
    </form>
  );
  
}
