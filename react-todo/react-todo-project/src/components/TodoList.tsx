import { useState } from "react";
import { Task } from "../lib/data";

type Props = {
  tasks: Task[];
  setTasks: (value: Task[]) => void;
};

export function TodoList({ tasks, setTasks }: Props) {
  const [viewComplete, setViewComplete] = useState(false);
  function handleDelete(taskId: number) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  function handleCompleted(taskId: number) {
    const index = tasks.findIndex((task) => task.id === taskId);
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, isComplete: true } : task
      )
    );
  }

  function handleClick(event: React.MouseEvent) {
    const eventTarget = event.target as HTMLElement;
    switch (eventTarget.textContent) {
      case "Completed":
        setViewComplete(true);
        break;
      case "Incomplete":
        setViewComplete(false);
        break;
    }
  }
  return (
    <>
      <section className="container flex flex-col items-center gap-2 mt-2 max-h-[80vh] overflow-scroll">
        <label className="swap">
          <input type="checkbox" />
          <div className="swap-on text-info" onClick={(e) => handleClick(e)}>
            Completed
          </div>
          <div className="swap-off text-error" onClick={(e) => handleClick(e)}>
            Incomplete
          </div>
        </label>
        <ul className="w-full">
          {tasks.map(
            (task) =>
              task.isComplete === viewComplete && (
                <li key={task.id} className="mb-2">
                  <div className="bg-white border border-gray-200 shadow-sm text-success collapse">
                    <input type="checkbox" />
                    <div className="text-xl font-medium opacity- collapse-title">
                      {task.title}
                    </div>
                    <div className="collapse-content">
                      <p>{task.notes}</p>
                      <div className="flex gap-2">
                        {!task.isComplete && (
                          <button
                            className="text-white btn btn-accent"
                            onClick={() => handleCompleted(task.id)}
                          >
                            complete
                          </button>
                        )}
                        <button
                          className="text-white btn btn-error"
                          onClick={() => handleDelete(task.id)}
                        >
                          delete
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              )
          )}
        </ul>
      </section>
    </>
  );
}
