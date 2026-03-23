import { useStore } from "../../store/useStore";
import KanbanColumn from "./KanbanColumn";
import type { Task, Status } from "../../types/task";

export default function KanbanBoard() {
  const { tasks, updateTaskStatus } = useStore();

  const columns: Record<Status, Task[]> = {
    todo: tasks.filter((t) => t.status === "todo"),
    inprogress: tasks.filter((t) => t.status === "inprogress"),
    review: tasks.filter((t) => t.status === "review"),
    done: tasks.filter((t) => t.status === "done"),
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {Object.entries(columns).map(([key, value]) => (
        <KanbanColumn
          key={key}
          title={key}
          tasks={value}
          onDrop={(id) => updateTaskStatus(id, key as Status)}
        />
      ))}
    </div>
  );
}
