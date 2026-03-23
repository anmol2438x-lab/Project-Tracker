import { useStore } from "../../store/useStore";
import { useState, useRef, useEffect } from "react";
import type { Task, Status } from "../../types/task";

type SortKey = "title" | "priority" | "dueDate";

const ROW_HEIGHT = 50;
const BUFFER = 5;

export default function ListView() {
  const { tasks, updateTaskStatus } = useStore();

  const [sortKey, setSortKey] = useState<SortKey>("title");
  const [asc, setAsc] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(500);


  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.clientHeight);
    }
  }, []);


  const sorted = [...tasks].sort((a, b) => {
    if (sortKey === "title") {
      return asc
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }

    if (sortKey === "priority") {
      const order = ["critical", "high", "medium", "low"];
      return asc
        ? order.indexOf(a.priority) - order.indexOf(b.priority)
        : order.indexOf(b.priority) - order.indexOf(a.priority);
    }

    if (sortKey === "dueDate") {
      return asc
        ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
    }

    return 0;
  });

  const handleSort = (key: SortKey) => {
    if (key === sortKey) setAsc(!asc);
    else {
      setSortKey(key);
      setAsc(true);
    }
  };

  const visibleCount = Math.ceil(containerHeight / ROW_HEIGHT);

  const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - BUFFER);

  const endIndex = Math.min(
    sorted.length,
    startIndex + visibleCount + BUFFER * 2,
  );

  const visibleRows = sorted.slice(startIndex, endIndex);

  return (
    <div
      ref={containerRef}
      className="h-[500px] overflow-y-auto border rounded-lg"
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <table className="table w-full">
        <thead className="sticky top-0 bg-gray-100">
          <tr>
            <th onClick={() => handleSort("title")}>
              Title {sortKey === "title" && "⬍"}
            </th>

            <th>Assignee</th>

            <th onClick={() => handleSort("priority")}>
              Priority {sortKey === "priority" && "⬍"}
            </th>

            <th onClick={() => handleSort("dueDate")}>
              Due {sortKey === "dueDate" && "⬍"}
            </th>

            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          <tr style={{ height: startIndex * ROW_HEIGHT }} />

          {visibleRows.map((task: Task) => (
            <tr key={task.id} className="h-[50px]">
              <td>{task.title}</td>

              <td>{task.assignee}</td>

              <td>
                <span className={`priority-${task.priority}`}>
                  {task.priority}
                </span>
              </td>

              <td>{task.dueDate}</td>

              <td>
                <select
                  aria-label="Change task status"
                  value={task.status}
                  onChange={(e) =>
                    updateTaskStatus(task.id, e.target.value as Status)
                  }
                >
                  <option value="todo">To Do</option>
                  <option value="inprogress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="done">Done</option>
                </select>
              </td>
            </tr>
          ))}


          <tr
            style={{
              height: (sorted.length - endIndex) * ROW_HEIGHT,
            }}
          />
        </tbody>
      </table>
    </div>
  );
}
