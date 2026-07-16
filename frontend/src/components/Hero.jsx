import heroImage from "../assets/hero.png";

function Hero({ progress }) {
  return (
    <div
      className="mb-5 rounded-4 overflow-hidden shadow-lg"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "320px",
      }}
    >
      <div
        className="row align-items-center h-100 p-5"
        style={{ minHeight: "320px" }}
      >
        <div className="col-md-8 text-white">

          <h1 className="display-4 fw-bold mb-3">
            Welcome to TaskFlow
          </h1>

          <p className="lead mb-0">
            Organize your work, track your progress, and stay productive every day.
          </p>

        </div>

        <div className="col-md-4 mt-4 mt-md-0">

          <div
            className="p-4 rounded-4"
            style={{
              backdropFilter: "blur(12px)",
              background: "rgba(255,255,255,.15)",
              color: "white",
            }}
          >
            <h2 className="fw-bold mb-2">
              {progress}%
            </h2>

            <p className="mb-2">
              Today's Progress
            </p>

            <div className="progress">
              <div
                className="progress-bar bg-danger"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Hero;