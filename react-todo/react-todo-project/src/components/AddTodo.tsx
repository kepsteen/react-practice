import { createPortal } from "react-dom";
import { Task } from "../App";
import { ChangeEvent, useEffect, useRef, useState } from "react";

type Props = {
  tasks: Task[];
  setTasks: (value: Task[]) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export function AddTodoModal({ tasks, setTasks, isOpen, setIsOpen }: Props) {
  const [title, settitle] = useState("");
  const [notes, setnotes] = useState("");
  const modal = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      modal.current?.showModal();
    } else {
      modal.current?.close();
    }
  }, [isOpen]);

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const newTask: Task = {
      id: Math.floor(Math.random() * 1000),
      title: title,
      notes: notes,
      isComplete: false,
    };
    setTasks([...tasks, newTask]);
    settitle("");
    setnotes("");
  }
  return createPortal(
    <dialog
      ref={modal}
      onClose={() => setIsOpen(false)}
      className="p-4 rounded-md bg-base-100"
    >
      <form
        action=""
        className="flex items-end gap-2 form-control"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="" className="w-full text-info">
          Add Todo Item
          <input
            type="text"
            name="task"
            placeholder="Task"
            value={title}
            className="w-full input input-primary input-sm text-primary"
            onChange={(e) => settitle(e.target.value)}
          />
        </label>
        <label htmlFor="" className="w-full text-info">
          <textarea
            className="w-full textarea textarea-bordered"
            placeholder="Notes"
            name="notes"
            value={notes}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setnotes(e.target.value)
            }
          ></textarea>
        </label>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setIsOpen(false)}
        >
          Add Todo Item
        </button>
      </form>
    </dialog>,
    document.body
  );
}
