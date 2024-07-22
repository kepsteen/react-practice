import { useState } from "react";
import { AddTodoModal } from "./components/AddTodo";
import { Header } from "./components/Header";
import { TodoList } from "./components/TodoList";
import { FaPlus } from "react-icons/fa6";

export interface Task {
  id: number;
  title: string;
  notes?: string;
  isComplete?: boolean;
}
const testTasks: Task[] = [
  {
    id: 1,
    title: "Make April Happy",
    notes:
      "I need to strive everyday to be the perfect boyfriend because April is the love of my life and she deserves the world",
    isComplete: false,
  },
  {
    id: 2,
    title: "Become the top software engineer ever",
    notes: "Who am I kidding? I just want to make a shit ton of money bro",
    isComplete: true,
  },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(testTasks);
  const [isOpen, setIsOpen] = useState(false);
  const [viewComplete, setViewComplete] = useState(false);
  return (
    <>
      <Header />
      <button
        className="mx-auto rounded-full btn btn-info"
        onClick={() => setIsOpen(true)}
      >
        <FaPlus className="text-2xl text-white" />
      </button>
      <AddTodoModal
        tasks={tasks}
        setTasks={setTasks}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <TodoList tasks={tasks} setTasks={setTasks} viewComplete={viewComplete} />
    </>
  );
}

export default App;
