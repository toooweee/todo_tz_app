import { FC, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { Form, useLoaderData } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import TaskModal from "../components/TaskModal.tsx";
import { instance } from "../api/axios.api.ts";
import { ITask } from "../types/types.ts";
import { toast } from "react-toastify";

export const tasksAction = async ({ request }: any) => {
  switch (request.method) {
    case "POST": {
      const formData = await request.formData();
      const title = formData.get("title");
      const body = formData.get("body");

      // Проверяем, что поля не пустые
      if (!title || !body) {
        toast.error("Заголовок и тело задачи не могут быть пустыми");
        return null;
      }

      const task = {
        title: title,
        body: body,
      };
      await instance.post("/tasks", task);
      toast.success("Вы успешно добавили задачу");
      return null;
    }
    case "PATCH": {
      const formData = await request.formData();
      const task = {
        id: formData.get("id"),
        title: formData.get("title"),
        body: formData.get("body"),
      };
      await instance.patch(`/tasks/task/${task.id}`, task);
      return null;
    }
    case "DELETE": {
      const formData = await request.formData();
      const taskId = formData.get("id");
      await instance.delete(`/tasks/task/${taskId}`);
      toast.info("Вы успешно удалили задачу");
      return null;
    }
  }
};

export const tasksLoader = async () => {
  const { data } = await instance.get<ITask>("/tasks");
  return data;
};

const Tasks: FC = () => {
  const tasks = useLoaderData() as ITask[];
  const [taskId, setTaskId] = useState<number>(0);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [visibleModal, setVisibleModal] = useState<boolean>(false);

  return (
    <>
      <div className="mt-10 p-5 rounded-md bg-emerald-50 shadow-md">
        <h1 className="text-2xl text-neutral-500 mb-4">Ваши задачи</h1>

        {/*адд таски*/}
        <button
          onClick={() => setVisibleModal(true)}
          className="max-w-fit flex items-center gap-2 text-neutral-500/50 hover:text-neutral-500 text-xl mb-6"
        >
          <IoAdd />
          <span>Добавить задачу</span>
        </button>

        {/*таски*/}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {tasks.map((task, idx) => (
            <div
              key={idx}
              className="group relative py-2 px-4 rounded-lg bg-violet-400"
            >
              <div className="flex flex-col gap-1">
                <div className="text-neutral-900 font-semibold">
                  {task.title}
                </div>
                <div className="text-neutral-700">{task.body}</div>
              </div>
              <div className="hidden absolute px-3 left-0 top-0 bottom-0 right-0 group-hover:flex rounded-lg bg-black/80 items-center justify-between">
                <button>
                  <FaRegEdit
                    onClick={() => {
                      setTaskId(task.id);
                      setVisibleModal(true);
                      setIsEdit(true);
                    }}
                  />
                </button>

                <Form className="flex" method="delete" action="/tasks">
                  <input type="hidden" value={task.id} name={"id"} />
                  <button type="submit">
                    <MdOutlineDeleteOutline />
                  </button>
                </Form>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*add task modal*/}
      {visibleModal && (
        <TaskModal type={"post"} setVisibleModal={setVisibleModal}></TaskModal>
      )}

      {/*edit task modal*/}
      {visibleModal && isEdit && (
        <TaskModal
          type={"patch"}
          id={taskId}
          setVisibleModal={setVisibleModal}
        ></TaskModal>
      )}
    </>
  );
};

export default Tasks;
