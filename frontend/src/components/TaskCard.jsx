function TaskCard({ task, toggleComplete, deleteTask, onEdit }) {
  const priorityClass =
    task.priority === "High"
      ? "bg-danger"
      : task.priority === "Medium"
      ? "bg-warning text-dark"
      : "bg-success";

  const formattedDate = task.due_date
    ? new Date(`${task.due_date}T00:00:00`).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "No date";

  return (
    <div className="col-12 col-lg-6">
      <div className="card task-card h-100">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h5
              className={`mb-0 ${
                task.completed
                  ? "text-decoration-line-through text-muted"
                  : ""
              }`}
            >
              📌 {task.title}
            </h5>

            <span
              className={`badge ${
                task.completed ? "bg-success" : "bg-secondary"
              }`}
            >
              {task.completed ? "Completed" : "Pending"}
            </span>
          </div>

          <p className="text-muted mb-3">
            {task.description || "No description"}
          </p>

          <div className="d-flex flex-wrap gap-2 mb-4">
            <span className="badge bg-light text-dark border">
              📁 {task.category || "General"}
            </span>

            <span className={`badge ${priorityClass}`}>
              🚩 {task.priority || "Medium"}
            </span>

            <span className="badge bg-light text-dark border">
              📅 {formattedDate}
            </span>
          </div>

          <div className="d-flex flex-wrap gap-2">
            <button
              className={`btn btn-sm ${
                task.completed ? "btn-secondary" : "btn-success"
              }`}
              onClick={() => toggleComplete(task)}
            >
              <i className="bi bi-check2-circle me-1"></i>
              {task.completed ? "Undo" : "Done"}
            </button>

            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => onEdit(task)}
            >
              <i className="bi bi-pencil me-1"></i>
              Edit
            </button>

            <button
              className="btn btn-sm btn-danger"
              onClick={() => deleteTask(task.id)}
            >
              <i className="bi bi-trash me-1"></i>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;