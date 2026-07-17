import { useState } from "react";
const API_URL = "https://taskflow-2k63.onrender.com";
function AuthForm({ onAuthSuccess }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    const endpoint = mode === "login" ? "/api/login" : "/api/register";

    const requestData =
      mode === "login"
        ? {
            email,
            password,
          }
        : {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
          };

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (!response.ok) {
        const validationErrors = data.errors
          ? Object.values(data.errors).flat().join(" ")
          : data.message;

        throw new Error(validationErrors || "Authentication failed.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      onAuthSuccess(data.user);

      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  const changeMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setError("");
  };

  return (
    <div className="auth-page min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card glass-card auth-card">
        <div className="card-body p-4 p-md-5">
          <div className="text-center mb-4">
            <div className="auth-logo mx-auto mb-3">
              <i className="bi bi-check2-square"></i>
            </div>

            <h2 className="fw-bold">TaskFlow</h2>

            <p className="text-muted">
              {mode === "login"
                ? "Welcome back! Log in to continue."
                : "Create your account and organize your tasks."}
            </p>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {mode === "register" && (
              <div className="mb-3">
                <label className="form-label">Name</label>

                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Email</label>

              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>

              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength="6"
                required
              />
            </div>

            {mode === "register" && (
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>

                <input
                  type="password"
                  className="form-control"
                  value={passwordConfirmation}
                  onChange={(event) =>
                    setPasswordConfirmation(event.target.value)
                  }
                  minLength="6"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                  ? "Login"
                  : "Create Account"}
            </button>
          </form>

          <p className="text-center text-muted mt-4 mb-0">
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}

            <button
              type="button"
              className="btn btn-link text-primary text-decoration-none"
              onClick={changeMode}
            >
              {mode === "login" ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;