import React, { useState } from "react";
import "../css/navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context";

function NavBar() {
  const [list, setList] = useState(false);
  const {logOutHandler} = useAuth();
  
  return (
    <>
      <nav className="nav-bar">
        <h1 className="nav-brand">Keep Notes</h1>
        <ul className="menus">
          <li className="menu">
            <i className="bi bi-list" onClick={() => setList(!list)}></i>
          </li>
        </ul>
      </nav>
      {list && (
        <div className="modal">
          <ul className="list-container hidden-list">
            <div className="list-heading">
              <i className="bi bi-x-lg" onClick={() => setList(false)}></i>
            </div>
            <li className="stacked">
              <Link to={"/home"} className="side-bar-links">
                <div className="options">
                  <i className="bi bi-house-door-fill"></i>
                  <h3>Home</h3>
                </div>
              </Link>
            </li>
            <li className="stacked">
              <Link to={"/archive"} className="side-bar-links">
                <div className="options">
                  <i className="bi bi-archive-fill"></i>
                  <h3>Archive</h3>
                </div>
              </Link>
            </li>
            <li className="stacked">
              <Link to={"/trash"} className="side-bar-links">
                <div className="options">
                  <i className="bi bi-trash-fill"></i>
                  <h3>Trash</h3>
                </div>
              </Link>
            </li>
            <li className="stacked" onClick={logOutHandler}>
              <Link to={"/login"} className="side-bar-links">
                <div className="options">
                  <i className="bi bi-person-fill"></i>
                  <h3>LogOut</h3>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export { NavBar };
