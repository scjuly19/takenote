import React from "react";
import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";
import { useData } from "../context";
import "../css/trash.css";

function Trash() {
  const { state, dispatch } = useData();

  function permanentDeleteHandler(id) {
    const newData = state.trash.filter((item) => item._id !== id);

    dispatch({ type: "PERMANENT_DELETE", payload: newData });
  }

  return (
    <>
      <NavBar></NavBar>
      <div className="trash-container">
        <SideBar></SideBar>
        <div className="trash-item-container">
          {state.trash.length === 0 && <h1 className="empty-trash-title">Trash is Empty</h1> }
          {state.trash.map((trashItem) => {
            return (
              <div className="card-container" key={trashItem._id}>
                <div
                  className="card card-without-image"
                  style={{ backgroundColor: trashItem.backgroundColor }}
                >
                  <div className="heading">
                    <div className="card-title">{trashItem.title}</div>
                    <div className="card-sub-title">
                      {trashItem.dateCreated}
                    </div>
                  </div>
                  <div className="card-content">{trashItem.content}</div>
                  <footer className="card-footer">
                    <i
                      title="delete permanently"
                      className="bi bi-trash-fill m-32"
                      onClick={() => permanentDeleteHandler(trashItem._id)}
                    ></i>
                  </footer>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export { Trash };
