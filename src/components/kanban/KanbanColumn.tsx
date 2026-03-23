import { useState } from "react";
import { useStore } from "../../store/useStore";
import type { Task } from "../../types/task";

interface Props {
  title: string;
  tasks: Task[];
  onDrop: (id: string) => void;
}

export default function KanbanColumn({ title, tasks, onDrop }: Props) {
  const { users } = useStore();

  const [dragId, setDragId] = useState<string | null>(null);

  const today = new Date();

  const getDueText = (date: string) => {
    const due = new Date(date);

    const diff = Math.floor(
      (today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diff === 0) return "Due Today";

    if (diff > 7) return `${diff} days overdue`;

    if (diff > 0) return "Overdue";

    return due.toDateString();
  };

  return (
    <div
      className="kanban-column w-full md:w-1/4 transition-all"
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={(e) => e.currentTarget.classList.add("bg-blue-100")}
      onDragLeave={(e) => e.currentTarget.classList.remove("bg-blue-100")}
      onDrop={(e) => {
        e.currentTarget.classList.remove("bg-blue-100");
        const id = e.dataTransfer.getData("id");
        setDragId(null);
        onDrop(id);
      }}
    >

      <h2 className="kanban-header">
        {title.toUpperCase()} ({tasks.length})
      </h2>

      <div className="kanban-body">
        {tasks.length === 0 && <div className="empty-state">No Tasks</div>}

        {tasks.map((task) => {
          const taskUsers = users.filter((u) => u.taskId === task.id);

          return (
            <div key={task.id}>

              {dragId === task.id && (
                <div className="h-[70px] bg-gray-200 rounded mb-2 border-2 border-dashed transition-all" />
              )}

              <div
                draggable
                onDragStart={(e) => {
                  setDragId(task.id);
                  e.dataTransfer.setData("id", task.id);
                  e.currentTarget.classList.add("dragging");
                }}
                onDragEnd={(e) => {
                  setDragId(null);
                  e.currentTarget.classList.remove("dragging");
                }}
                className="card cursor-grab transition-all"
              >

                <p className="font-medium">{task.title}</p>


                <div className="flex justify-between mt-2 items-center">
                  <span className="avatar bg-blue-500">{task.assignee}</span>

                  <span className={`priority-${task.priority}`}>
                    {task.priority}
                  </span>
                </div>


                <p
                  className={`text-xs mt-1 ${
                    getDueText(task.dueDate).includes("overdue")
                      ? "overdue"
                      : ""
                  }`}
                >
                  {getDueText(task.dueDate)}
                </p>

             
                {taskUsers.length > 0 && (
                  <div className="flex mt-2 -space-x-2">
                    {taskUsers.slice(0, 2).map((u) => (
                      <span key={u.id} className={`avatar ${u.color}`}>
                        U
                      </span>
                    ))}

                    {taskUsers.length > 2 && (
                      <span className="avatar bg-gray-400">
                        +{taskUsers.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
