import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsCards from "./components/StatsCards";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";
import AuthForm from "./components/AuthForm";
const API_URL = "https://taskflow-2k63.onrender.com";
function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("Study");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const [editingTask, setEditingTask] = useState(null);

  const [activeTab, setActiveTab] = useState("tasks");
  const [page, setPage] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    fetch(`${API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.log(err));
  }, []);



const addTask = () => {
  if (!title.trim()) return;

  const taskData = {
    title,
    description,
    category,
    priority,
    due_date: dueDate || null,
  };

  if (editingTask) {
   fetch(`${API_URL}/tasks/${editingTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...taskData,
        completed: editingTask.completed,
      }),
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        setTasks(
          tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          )
        );

        setEditingTask(null);
        setTitle("");
        setDescription("");
        setCategory("Study");
        setPriority("Medium");
        setDueDate("");
      })
      .catch((error) => console.log(error));

    return;
  }

  fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  })
    .then((res) => res.json())
    .then((newTask) => {
      setTasks([newTask, ...tasks]);

      setTitle("");
      setDescription("");
      setCategory("Study");
      setPriority("Medium");
      setDueDate("");
    })
    .catch((error) => console.log(error));
};
  const deleteTask = (id) => {
    fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" }).then(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    });
  };

  const toggleComplete = (task) => {
   fetch(`${API_URL}/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        completed: !task.completed,
      }),
      
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
      });
  };
const editTask = (task) => {
  setEditingTask(task);

  setTitle(task.title);
  setDescription(task.description || "");
  setCategory(task.category || "Study");
  setPriority(task.priority || "Medium");
  setDueDate(task.due_date || "");
};
  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.length - completedCount;
  const progress = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0;

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "pending" && !task.completed);

    return matchesSearch && matchesFilter;
  });
const logout = async () => {
  const token = localStorage.getItem("token");

  try {
    await fetch("/api/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }
};
  if (!user) {
  return <AuthForm onAuthSuccess={setUser} />;
}

  return (
    <div className="min-vh-100">
     <Navbar
  page={page}
  setPage={setPage}
  user={user}
  onLogout={logout}
/> 

      <div className="container py-5">
        <Hero progress={progress} />

        {page === "insights" ? (
          <div className="card glass-card">
            <div className="card-body">
              <h3 className="mb-4">
                <i className="bi bi-bar-chart-line me-2 text-primary"></i>
                Task Insights
              </h3>

              <div className="row g-4">
                <div className="col-md-6">
                  <div className="p-4 bg-light rounded-4">
                    <h5>Completion Rate</h5>
                    <h2>{progress}%</h2>
                    <div className="progress">
                      <div
                        className="progress-bar bg-success"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-4 bg-light rounded-4">
                    <h5>Productivity Status</h5>
                    <p className="mb-0">
                      {progress === 100
                        ? "🎉 Excellent! All tasks are completed."
                        : progress >= 50
                        ? "🔥 Great progress, keep going!"
                        : "⏳ You still have tasks to finish."}
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-4 bg-light rounded-4">
                    <h5>Pending Tasks</h5>
                    <h2 className="text-warning">{pendingCount}</h2>
                    <p className="text-muted mb-0">
                      Tasks that still need your attention.
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-4 bg-light rounded-4">
                    <h5>Completed Tasks</h5>
                    <h2 className="text-success">{completedCount}</h2>
                    <p className="text-muted mb-0">
                      Tasks you successfully finished.
                    </p>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="p-4 bg-light rounded-4">
                    <h5 className="mb-3">Latest Tasks</h5>

                    {tasks.length === 0 ? (
                      <p className="text-muted mb-0">No tasks yet.</p>
                    ) : (
                      tasks.slice(0, 5).map((task) => (
                        <div
                          className="d-flex justify-content-between border-bottom py-2"
                          key={task.id}
                        >
                          <span>{task.title}</span>
                          <span
                            className={`badge ${
                              task.completed
                                ? "bg-success"
                                : "bg-warning text-dark"
                            }`}
                          >
                            {task.completed ? "Completed" : "Pending"}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <StatsCards
  tasks={tasks}
  completedCount={completedCount}
  pendingCount={pendingCount}
/>

            <ul className="nav nav-pills justify-content-center mb-4">
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "tasks" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("tasks")}
                >
                  <i className="bi bi-kanban me-1"></i> Tasks
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "calendar" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("calendar")}
                >
                  <i className="bi bi-calendar3 me-1"></i> Calendar
                </button>
              </li>
            </ul>

            {activeTab === "tasks" && (
              <>
              <TaskForm
  title={title}
  setTitle={setTitle}
  description={description}
  setDescription={setDescription}
  category={category}
  setCategory={setCategory}
  priority={priority}
  setPriority={setPriority}
  dueDate={dueDate}
  setDueDate={setDueDate}
  addTask={addTask}
  editingTask={editingTask}
/>

                <div className="row mb-4 g-2">
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      placeholder="Search tasks..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>

                  <div className="col-md-4">
                    <select
                      className="form-select"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option value="all">All Tasks</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>

           {filteredTasks.length === 0 ? (
  <div className="text-center py-5">
    <div style={{ fontSize: "70px" }}>📋</div>

    <h3 className="fw-bold mt-3">
      No Tasks Yet
    </h3>

    <p className="text-muted">
      Create your first task and start organizing your day.
    </p>
  </div>
) : (
  <div className="row g-4">
    {filteredTasks.map((task) => (
      <TaskCard
        key={task.id}
        task={task}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
        onEdit={editTask}
      />
    ))}
  </div>
)}
              </>
            )}

            {activeTab === "calendar" && (
              <div className="card glass-card">
                <div className="card-body">
                  <h4 className="mb-4">📅 Calendar View</h4>

                  {tasks.length === 0 ? (
                    <p className="text-muted">No tasks to show.</p>
                  ) : (
                    tasks.map((task) => (
                      <div className="border-bottom py-3" key={task.id}>
                        <span className="badge bg-light text-dark border me-2">
                          {task.created_at
                            ? task.created_at.slice(0, 10)
                            : "No date"}
                        </span>
                        <strong>{task.title}</strong>
                        <p className="text-muted mb-0">{task.description}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </>
        )}
        <footer
  className="text-center mt-5 py-4"
  style={{
    borderTop: "1px solid #eee",
    color: "#777",
    fontSize: "14px",
  }}
>
  <h6 className="fw-bold mb-2">
    TaskFlow
  </h6>

  <p className="mb-1">
    Built with React • Laravel • MySQL
  </p>

  <small>
    © 2026 All Rights Reserved
  </small>
</footer>
      </div>
    </div>
    
  );
  
}

export default App;