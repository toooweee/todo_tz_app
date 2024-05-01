import { FC } from "react";
import { Form } from "react-router-dom";

interface ITaskModal {
  type: "post" | "patch";
  id?: number;
  setVisibleModal: (visible: boolean) => void;
}

const TaskModal: FC<ITaskModal> = ({ type, id, setVisibleModal }) => {
  return (
    <div
      className={
        "fixed top-0 right-0 left-0 bottom-0 w-full h-full bg-black/50 flex justify-center items-center"
      }
    >
      <Form
        action={"/tasks"}
        method={type}
        onSubmit={() => setVisibleModal(false)}
        className={"grid gap-2 w-[300px] p-5 rounded-md bg-slate-200"}
      >
        <label htmlFor={"title"}>
          <small className="text-neutral-500 text-xl">Добавить задачу</small>
          <input
            className={"input w-full text-neutral-100"}
            type="text"
            name="title"
            placeholder="Заголовок"
          />
          <input type={"hidden"} value={id} name={"id"} />
        </label>

        <label htmlFor={"body"} className={"flex flex-col"}>
          <small className="text-neutral-500 text-xl">Заметка</small>
          <textarea
            className={"input w-full text-neutral-100 resize-y"}
            name="body"
            placeholder="Запись"
          />
        </label>

        <div className={"flex items-center gap-2"}>
          <button type={"submit"} className={"btn btn-green"}>
            {type === "patch" ? "Сохранить" : "Добавить"}
          </button>
          <button
            onClick={() => setVisibleModal(false)}
            className={"btn btn-red"}
          >
            Закрыть
          </button>
        </div>
      </Form>
    </div>
  );
};

export default TaskModal;
