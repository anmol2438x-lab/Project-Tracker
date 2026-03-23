import { useStore } from "../../store/useStore";
import { useEffect } from "react";

export default function FilterBar() {
  const { filters, setFilters, applyFilters, clearFilters, allTasks } =
    useStore();


  const assignees = Array.from(new Set(allTasks.map((t) => t.assignee)));

  useEffect(() => {
    applyFilters();
  }, [filters, applyFilters]);

  return (
    <div className="filter-bar mb-4 flex flex-wrap gap-2">

      <select
        aria-label="Filter by status"
        value={filters.status[0] || ""}
        onChange={(e) =>
          setFilters({
            status: e.target.value ? [e.target.value] : [],
          })
        }
        className="select"
      >
        <option value="">All Status</option>
        <option value="todo">To Do</option>
        <option value="inprogress">In Progress</option>
        <option value="review">Review</option>
        <option value="done">Done</option>
      </select>


      <select
        aria-label="Filter by priority"
        value={filters.priority[0] || ""}
        onChange={(e) =>
          setFilters({
            priority: e.target.value ? [e.target.value] : [],
          })
        }
        className="select"
      >
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>


      <select
        aria-label="Filter by assignee"
        multiple
        value={filters.assignee}
        onChange={(e) =>
          setFilters({
            assignee: Array.from(e.target.selectedOptions, (opt) => opt.value),
          })
        }
        className="select"
      >
        {assignees.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>

      {(filters.status.length ||
        filters.priority.length ||
        filters.assignee.length) > 0 && (
        <button onClick={clearFilters} className="btn btn-secondary">
          Clear Filters
        </button>
      )}
    </div>
  );
}
