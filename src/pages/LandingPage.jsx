import React from "react";
import { Link } from "react-router-dom";
import "../css/landing-page.css";

function LandingPage() {
  return (
    <div className="landing-page-container">
      <div className="landing-page-content">
        <div className="header-container">
          <h1 className="header-title">Takenote</h1>
          <Link className="btn-link" to={"/login"}>
            <button className="login-btn">Login</button>{" "}
          </Link>
        </div>
        <div className="intro-container">
          <div className="landing-page-image">
            <img src="/assets/hero.svg" />
          </div>
          <h3 className="page-title">Your personalised note taking app</h3>
          <p className="sub-title">
            Remember everything and tackle any project with your notes, tasks,
            and schedule all in one place.
          </p>
        </div>
      </div>
    </div>
  );
}

export { LandingPage };
