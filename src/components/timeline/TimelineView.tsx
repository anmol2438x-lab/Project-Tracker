import { useStore } from "../../store/useStore";
import type { Task } from "../../types/task";

export default function TimelineView() {
  const { tasks } = useStore();

  const today = new Date();
  const todayDay = today.getDate();

  return (
    <div className="overflow-x-auto relative p-4 bg-white rounded-xl shadow">
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-red-500"
        style={{ left: todayDay * 30 }}
      />

      <div className="min-w-[1200px]">
        {tasks.map((task: Task) => {
          const start = new Date(task.startDate || task.dueDate);
          const end = new Date(task.dueDate);

          const left = start.getDate() * 30;
          const width = (end.getDate() - start.getDate() + 1) * 30;

          return (
            <div key={task.id} className="mb-4">
              <p className="text-sm mb-1">{task.title}</p>

              <div
                className={`timeline-bar priority-${task.priority}`}
                style={{
                  marginLeft: left,
                  width: task.startDate ? width : 12,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
