"use client";

import { useState } from "react";

type Task = {
  id: number;
  title: string;
  project: string;
  priority: "High" | "Medium" | "Low";
  status: "todo" | "progress" | "done";
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Design dashboard wireframes",
    project: "Website Redesign",
    priority: "High",
    status: "todo",
  },
  {
    id: 2,
    title: "Set up project structure",
    project: "TaskFlow",
    priority: "High",
    status: "todo",
  },
  {
    id: 3,
    title: "Create navigation component",
    project: "TaskFlow",
    priority: "Medium",
    status: "progress",
  },
  {
    id: 4,
    title: "Review color palette",
    project: "Website Redesign",
    priority: "Low",
    status: "progress",
  },
  {
    id: 5,
    title: "Research competitors",
    project: "Marketing",
    priority: "Medium",
    status: "done",
  },
];

const columns = [
  { id: "todo", title: "To Do", color: "#64748b" },
  { id: "progress", title: "In Progress", color: "#6366f1" },
  { id: "done", title: "Completed", color: "#10b981" },
] as const;

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeNav, setActiveNav] = useState("Overview");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] =
    useState<Task["priority"]>("Medium");

  const completed = tasks.filter(
    (task) => task.status === "done"
  ).length;

  const progress = tasks.filter(
    (task) => task.status === "progress"
  ).length;

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.project.toLowerCase().includes(search.toLowerCase())
  );

  function addTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!newTask.trim()) return;

    setTasks((current) => [
      ...current,
      {
        id: Date.now(),
        title: newTask.trim(),
        project: "TaskFlow",
        priority: newPriority,
        status: "todo",
      },
    ]);

    setNewTask("");
    setNewPriority("Medium");
    setShowForm(false);
  }

  function moveTask(id: number, status: Task["status"]) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    );
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#" aria-label="TaskFlow home">
          <span className="brand-icon">T</span>
          <span>taskflow<span className="brand-dot">.</span></span>
        </a>

        <div className="workspace-label">WORKSPACE</div>

        <nav className="nav-list" aria-label="Main navigation">
          {[
            ["Overview", "◫"],
            ["My Tasks", "✓"],
            ["Projects", "▦"],
            ["Calendar", "▣"],
            ["Settings", "⚙"],
          ].map(([label, icon]) => (
            <button
              key={label}
              className={`nav-item ${
                activeNav === label ? "active" : ""
              }`}
              onClick={() => setActiveNav(label)}
            >
              <span className="nav-icon">{icon}</span>
              <span>{label}</span>
              {label === "My Tasks" && (
                <span className="nav-count">{tasks.length}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-icon">✦</div>
            <strong>Make work flow.</strong>
            <p>Stay organized and get more done every day.</p>
            <button onClick={() => setActiveNav("Projects")}>
              Explore projects <span>→</span>
            </button>
          </div>

          <div className="profile">
            <div className="avatar">M</div>
            <div className="profile-info">
              <strong>My Workspace</strong>
              <span>Free plan</span>
            </div>
            <span className="profile-menu">···</span>
          </div>
        </div>
      </aside>

      <section className="main-panel">
        <header className="topbar">
          <div className="breadcrumb">
            Workspace <span>/</span>{" "}
            <strong>{activeNav}</strong>
          </div>

          <div className="topbar-actions">
            <label className="search-box">
              <span>⌕</span>
              <input
                type="search"
                placeholder="Search tasks..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search tasks"
              />
              <kbd>/</kbd>
            </label>
            <button
              className="icon-button"
              aria-label="Notifications"
              title="Notifications"
            >
              ♧
            </button>
            <div className="avatar top-avatar">M</div>
          </div>
        </header>

        <div className="dashboard-content">
          <section className="welcome-row">
            <div>
              <div className="eyebrow">
                MONDAY, OCTOBER 19
              </div>
              <h1>Good morning, Developer <span>✳</span></h1>
              <p>Here&apos;s what&apos;s happening with your projects today.</p>
            </div>

            <button
              className="primary-button"
              onClick={() => setShowForm(!showForm)}
            >
              <span>＋</span> New task
            </button>
          </section>

          {showForm && (
            <form className="task-form" onSubmit={addTask}>
              <div className="form-heading">Create a task</div>

              <input
                autoFocus
                value={newTask}
                onChange={(event) => setNewTask(event.target.value)}
                placeholder="What needs to get done?"
                aria-label="Task title"
                required
              />

              <select
                value={newPriority}
                onChange={(event) =>
                  setNewPriority(
                    event.target.value as Task["priority"]
                  )
                }
                aria-label="Task priority"
              >
                <option value="High">High priority</option>
                <option value="Medium">Medium priority</option>
                <option value="Low">Low priority</option>
              </select>

              <button className="primary-button" type="submit">
                Create task
              </button>
              <button
                className="cancel-button"
                type="button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </form>
          )}

          <section className="stats-grid" aria-label="Task statistics">
            <article className="stat-card">
              <div className="stat-top">
                <span>Total tasks</span>
                <span className="stat-icon purple">▤</span>
              </div>
              <div className="stat-number">{tasks.length}</div>
              <div className="stat-foot">
                <span className="stat-neutral">All tasks</span>
                <span>across your workspace</span>
              </div>
            </article>

            <article className="stat-card">
              <div className="stat-top">
                <span>In progress</span>
                <span className="stat-icon blue">◷</span>
              </div>
              <div className="stat-number">{progress}</div>
              <div className="stat-foot">
                <span className="stat-neutral">Active</span>
                <span>currently being worked on</span>
              </div>
            </article>

            <article className="stat-card">
              <div className="stat-top">
                <span>Completed</span>
                <span className="stat-icon green">✓</span>
              </div>
              <div className="stat-number">{completed}</div>
              <div className="stat-foot">
                <span className="stat-positive">✓ {completed} finished</span>
                <span>tasks completed</span>
              </div>
            </article>

            <article className="stat-card">
              <div className="stat-top">
                <span>Completion rate</span>
                <span className="stat-icon orange">↗</span>
              </div>
              <div className="stat-number">
                {tasks.length
                  ? Math.round((completed / tasks.length) * 100)
                  : 0}
                <span className="percent">%</span>
              </div>
              <div className="mini-progress">
                <span
                  style={{
                    width: `${
                      tasks.length
                        ? (completed / tasks.length) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </article>
          </section>

          <section className="board-section">
            <div className="board-heading">
              <div>
                <h2>My task board</h2>
                <p>Keep track of your work and make progress.</p>
              </div>

              <div className="board-controls">
                <span className="board-view">☷ Board view</span>
                <span className="task-total">{filteredTasks.length} tasks</span>
              </div>
            </div>

            <div className="kanban-board">
              {columns.map((column) => {
                const columnTasks = filteredTasks.filter(
                  (task) => task.status === column.id
                );

                return (
                  <section
                    className="kanban-column"
                    key={column.id}
                    aria-label={column.title}
                  >
                    <div className="column-heading">
                      <div className="column-title">
                        <span
                          className="column-dot"
                          style={{ backgroundColor: column.color }}
                        />
                        <h3>{column.title}</h3>
                        <span className="column-count">
                          {columnTasks.length}
                        </span>
                      </div>
                      <button
                        className="column-menu"
                        aria-label={`Options for ${column.title}`}
                      >
                        ···
                      </button>
                    </div>

                    <div className="task-list">
                      {columnTasks.map((task) => (
                        <article className="task-card" key={task.id}>
                          <div className="task-card-top">
                            <span className={`priority ${task.priority.toLowerCase()}`}>
                              <span>●</span> {task.priority}
                            </span>
                            <button
                              className="task-menu"
                              aria-label={`Options for ${task.title}`}
                            >
                              ···
                            </button>
                          </div>

                          <h4>{task.title}</h4>
                          <div className="task-project">
                            <span className="project-symbol">▧</span>
                            {task.project}
                          </div>

                          <div className="task-card-bottom">
                            <div className="task-assignee">
                              <span className="mini-avatar">M</span>
                              <span>You</span>
                            </div>

                            <label className="status-select-label">
                              <span className="sr-only">
                                Status for {task.title}
                              </span>
                              <select
                                value={task.status}
                                onChange={(event) =>
                                  moveTask(
                                    task.id,
                                    event.target.value as Task["status"]
                                  )
                                }
                              >
                                <option value="todo">To Do</option>
                                <option value="progress">In Progress</option>
                                <option value="done">Completed</option>
                              </select>
                            </label>
                          </div>
                        </article>
                      ))}

                      {columnTasks.length === 0 && (
                        <div className="empty-column">
                          No tasks here yet.
                        </div>
                      )}
                    </div>

                    <button
                      className="add-task-button"
                      onClick={() => setShowForm(true)}
                    >
                      ＋ Add task
                    </button>
                  </section>
                );
              })}
            </div>
          </section>

          <footer className="dashboard-footer">
            <span>Made for focused work.</span>
            <span>TaskFlow · Your workspace, organized.</span>
          </footer>
        </div>
      </section>
    </main>
  );
}