import { FC, useEffect, useState } from "react";
import { instance } from "../api/axios.api.ts";
import { ITask } from "../types/types.ts";
import UserDetails from "../components/UserDetails.tsx";

const All: FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await instance.get<ITask[]>("/tasks/all");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="mt-10 p-5 rounded-md bg-emerald-50 shadow-md">
      <h1 className="text-2xl text-neutral-500">All Tasks</h1>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        {tasks.map((task, idx) => (
          <div
            key={idx}
            className="group relative py-2 px-4 rounded-lg bg-violet-400"
          >
            <div className="flex flex-col gap-1">
              <div className="text-neutral-900 font-semibold">{task.title}</div>
              <div className="text-neutral-700">{task.body}</div>
              <UserDetails user={task.user} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default All;
