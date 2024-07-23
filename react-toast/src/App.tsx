import { useCallback, useEffect, useState } from "react";
import "./App.css";

interface Toast {
  id: number;
  msg: string;
}

function App() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  // const [timeouts, settimeouts] = useState<ReturnType<typeof setTimeout>[]>([]);
  const handleDelete = useCallback((toastId: number) => {
    setToasts((prevToasts) =>
      prevToasts.filter((toast) => toast.id !== toastId)
    );
  }, []);

  useEffect(() => {
    const timers = toasts.map((toast) =>
      setTimeout(() => handleDelete(toast.id), 3000)
    );

    return () => timers.forEach(clearTimeout);
  }, [toasts, handleDelete]);
  function handleCreateToast() {
    const id = Math.floor(Math.random() * 1000);
    const newToast: Toast = {
      id: id,
      msg: `I'm toast #${id}`,
    };
    setToasts([...toasts, newToast]);
  }

  return (
    <>
      <button
        className="px-5 py-2 text-white bg-pink-700 rounded-full"
        onClick={handleCreateToast}
      >
        Create a Toast
      </button>
      <div className="fixed flex flex-col gap-2 bottom-4 right-4 toast-container">
        {toasts.map((toast) => (
          <div
            className="relative flex items-start justify-between py-4 bg-pink-100 rounded-md px-7"
            key={toast.id}
          >
            <span>{toast.msg}</span>
            <span
              className="absolute top-0 text-gray-500 right-2 hover:text-xl"
              onClick={() => handleDelete(toast.id)}
            >
              x
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
