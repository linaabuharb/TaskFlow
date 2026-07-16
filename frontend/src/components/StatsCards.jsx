function StatsCards({ tasks, completedCount, pendingCount }) {
  return (
    <div className="row g-3 mb-4">
      <div className="col-md-4">
        <div className="card glass-card">
          <div className="card-body d-flex align-items-center gap-3">
            <div className="icon-box">
              <i className="bi bi-list-check"></i>
            </div>
            <div>
              <p className="text-muted mb-0">Total Tasks</p>
              <h3>{tasks.length}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card glass-card">
          <div className="card-body d-flex align-items-center gap-3">
            <div className="icon-box">
              <i className="bi bi-check-circle"></i>
            </div>
            <div>
              <p className="text-muted mb-0">Completed</p>
              <h3 className="text-success">{completedCount}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card glass-card">
          <div className="card-body d-flex align-items-center gap-3">
            <div className="icon-box">
              <i className="bi bi-hourglass-split"></i>
            </div>
            <div>
              <p className="text-muted mb-0">Pending</p>
              <h3 className="text-warning">{pendingCount}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsCards;