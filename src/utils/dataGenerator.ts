import type { Task } from "../types/task";

const users = ["AK", "RS", "PK", "AM", "SK", "VK"];
const priorities = ["low", "medium", "high", "critical"] as const;
const statuses = ["todo", "inprogress", "review", "done"] as const;

export function generateTasks(count: number): Task[] {
  const tasks: Task[] = [];

  for (let i = 0; i < count; i++) {
    const start = Math.random() > 0.3 ? new Date() : undefined;

    const due = new Date();
    due.setDate(due.getDate() + Math.floor(Math.random() * 10 - 5));

    tasks.push({
      id: String(i),
      title: `Task ${i}`,
      assignee: users[Math.floor(Math.random() * users.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      startDate: start?.toISOString(),
      dueDate: due.toISOString(),
    });
  }

  return tasks;
}
