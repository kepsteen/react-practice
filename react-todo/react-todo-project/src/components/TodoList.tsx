import { Task } from "../App";

type Props = {
  tasks: Task[];
  setTasks: (value: Task[]) => void;
  viewComplete: boolean;
};

export function TodoList({ tasks, setTasks, viewComplete }: Props) {
  function handleDelete(taskId: number) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }
  return (
    <>
      <section className="container mt-2 max-h-[80vh] overflow-scroll">
        <ul>
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
                        <button className="text-white btn btn-accent">
                          complete
                        </button>
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
