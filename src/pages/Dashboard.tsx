import { useState } from "react";
import FilterBar from "../components/common/FilterBar";
import KanbanBoard from "../components/kanban/KanbanBoard";
import ListView from "../components/list/ListView";
import TimelineView from "../components/timeline/TimelineView";

type ViewType = "kanban" | "list" | "timeline";

export default function Dashboard() {
  const [view, setView] = useState<ViewType>("kanban");

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-4">Project Tracker</h1>

      <FilterBar />


      <div className="mb-4 flex gap-2">
        <button
          className={`btn ${
            view === "kanban" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => setView("kanban")}
        >
          Kanban
        </button>

        <button
          className={`btn ${view === "list" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setView("list")}
        >
          List
        </button>

        <button
          className={`btn ${
            view === "timeline" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => setView("timeline")}
        >
          Timeline
        </button>
      </div>

      <div className="mt-2">
        {view === "kanban" && <KanbanBoard />}
        {view === "list" && <ListView />}
        {view === "timeline" && <TimelineView />}
      </div>
    </div>
  );
}
