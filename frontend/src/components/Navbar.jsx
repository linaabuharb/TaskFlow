import logo from "../assets/logo.png";
function Navbar({ page, setPage, user, onLogout }) {
  return (
    <nav className="navbar navbar-light bg-white shadow-sm">
      <div className="container">

        <div className="navbar-brand d-flex align-items-center">
  <img
    src={logo}
    alt="TaskFlow"
    style={{
      height: "90px",
      width: "auto",
      objectFit: "contain",
    }}
  />
</div>

        <div className="d-flex gap-2">

          <button
            className={`btn btn-sm ${
              page === "dashboard"
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => setPage("dashboard")}
          >
            Dashboard
          </button>

          <button
            className={`btn btn-sm ${
              page === "insights"
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => setPage("insights")}
          >
            Insights
          </button>
<span className="d-flex align-items-center text-muted small">
  <i className="bi bi-person-circle me-1"></i>
  {user?.name}
</span>

<button
  className="btn btn-sm btn-outline-danger"
  onClick={onLogout}
>
  <i className="bi bi-box-arrow-right me-1"></i>
  Logout
</button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;