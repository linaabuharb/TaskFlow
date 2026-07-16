function TaskForm({
  title,
  setTitle,
  description,
  setDescription,
  category,
  setCategory,
  priority,
  setPriority,
  dueDate,
  setDueDate,
  addTask,
  editingTask,

}) {
  return (
    <div className="card glass-card mb-4">
      <div className="card-body">
        <h4 className="mb-3">➕ Add New Task</h4>

        <input
          className="form-control mb-3"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="row g-3 mb-3">
          <div className="col-md-4">
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Study">📚 Study</option>
              <option value="Work">💼 Work</option>
              <option value="Personal">🏠 Personal</option>
              <option value="Shopping">🛒 Shopping</option>
            </select>
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">🔴 High</option>
              <option value="Medium">🟠 Medium</option>
              <option value="Low">🟢 Low</option>
            </select>
          </div>

          <div className="col-md-4">
            <input
              type="date"
              className="form-control"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        <button className="btn btn-primary w-100" onClick={addTask}>
  <i
    className={`bi ${
      editingTask ? "bi-pencil-square" : "bi-plus-circle"
    } me-1`}
  ></i>

  {editingTask ? "Update Task" : "Add Task"}
</button>
      </div>
    </div>
  );
}

export default TaskForm;