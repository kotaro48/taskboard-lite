import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, type SubmitErrorHandler } from "react-hook-form";
import { set, z } from "zod";
import api from "../api";

//定义 数据验证模式
const schema = z.object({
  title: z.string().min(1, "标题必填"),
  due: z.string().optional()
});

type Task = {id: number; title: string; done: boolean; due?: string; notes?: string};

export default function Tasks() {
    // task: Task[]
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);



    
    const {register,handleSubmit, reset, formState: { errors }, setFocus}
     = useForm <{ title: string; due?: string }>({resolver: zodResolver(schema)});

    const load = async() => {
        setLoading(true);
        setError(null);
        try {
            // const {data} = await fetch("/api/tasks");
            const {data} = await api.get<Task[]>("/tasks");
            setTasks(data);
        } catch (e : any) {
            setError(e.message || "加载失败");
        }
    };

    useEffect(() => { load(); }, []);

    const onInvalidSubmit: SubmitErrorHandler<{ title: string; due?: string }> = (e) => {
      console.log("验证失败", e);
    };

    async function onValidSubmit(values: { title: string; due?: string }) {
        const optimisticNewTask : Task = {id: Date.now(), title: values.title, done: false, due: values.due};
        //数组展开语法 [...prev,optimisticNewTask] = [oldtask1,oldTask2, optimisticNewTaskのnewTask1,newTask2];
        // 乐观更新 
        setTasks(prev => [...prev,optimisticNewTask]);
        // TODO
        reset();
        try {
            // 
            const{data} = await api.post<Task>("/tasks", {title:values.title, due: values.due});
            // 用后端返回的真实数据替换乐观更新的数据 
            setTasks(prev => prev.map(t => t.id === optimisticNewTask.id ? data : t));//prev里每个元素进行比对后替换

        }catch (e) {
            // 回滚
            setTasks(prev => prev.filter(t => t.id !== optimisticNewTask.id));
        }
    }

    const onCreate = handleSubmit(onValidSubmit, onInvalidSubmit);

    // 使用 function 声明并准确标注参数类型（hoisted，可在上面使用）
    // async function method2(
    //   errors: Parameters<SubmitErrorHandler<{ title: string; due?: string }>>[0],
    //   event?: Parameters<SubmitErrorHandler<{ title: string; due?: string }>>[1]
    // ): Promise<void> {
    //     console.log("验证失败", errors);
    //     if(errors.title) {
    //         setFocus("title");
    //     }
    // }

    const toggleDone = async(task: Task) => {
        const updated = {...task, done: !task.done};
        setTasks(prev => prev.map(t => t.id === task.id ? updated : t));
        try {
            await api.patch(`/tasks/${task.id}`, {done: updated.done});
        } catch (e) {
            setTasks(prev => prev.map(t => t.id === task.id ? task : t));
            alert("更新失败");
        }   
    };

    return (
        <div>
            <h1>タスクリスト</h1>

            <form onSubmit={onCreate} style={{display: "flex", gap: 8, marginBottom: 12}} >
                <input placeholder="タイトル" {...register("title")} />
                <input type="date" {...register("due")} />
                <button type="submit">追加</button>
            </form>
            {errors.title && <div style={{color: "tomato"}}>{errors.title.message}</div>}

            {loading && <p>加载中...</p>}
            {error && <p style={{ color: "tomato" }}>{error}</p>}

            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {tasks.map(task => (
                    <li key={task.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <input
                            type="checkbox"
                            checked={task.done}
                            onChange={() => toggleDone(task)}
                        />
                        <span style={task.done ? { textDecoration: "line-through", color: "#888" } : undefined}>
                            {task.title}
                        </span>
                        {task.due && (
                            <small style={{ marginLeft: "auto", color: "#666" }}>
                                期限: {task.due}
                            </small>
                        )}
                    </li>
                ))}
            </ul>

        </div>


    )


}
