import axios from "axios";
import React from "react";
import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";
import { useAuth, useData } from "../context";
import "../css/archive.css";

function Archive() {
  const { state, dispatch } = useData();
  const { token } = useAuth();

  async function archiveRestoreHandler(id) {
    try {
      const response = await axios.post(
        `/api/archives/restore/${id}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        dispatch({
          type: "ARCHIVE",
          payload: { archive: response.data.archives },
        });
        dispatch({ type: "ADD_NOTES", payload: { note: response.data.notes } });
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function archiveDeleteHandler(id) {
    const deletedData = state.archive.filter((item) => item._id === id)[0];
    try {
      const response = await axios.delete(`/api/archives/delete/${id}`, {
        headers: {
          authorization: token,
        },
      });

      if (response.status === 200 || response.status === 201) {
        dispatch({
          type: "ARCHIVE",
          payload: { archive: response.data.archives },
        });
        dispatch({ type: "TRASH", payload: deletedData });
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <NavBar></NavBar>
      <main className="archive-container">
        <SideBar></SideBar>
        <div className="archive-note-container">
          {state.archive.length === 0 && <h1 className="empty-archive-title">Archive is Empty</h1> }
          {state.archive.map((archivedData) => {
            return (
              <div className="card-container" key={archivedData._id}>
                <div
                  className="card card-without-image"
                  style={{ backgroundColor: archivedData.backgroundColor }}
                >
                  <div className="heading">
                    <div className="card-title">{archivedData.title}</div>
                    <div className="card-sub-title label">
                      {archivedData.label}
                    </div>
                  </div>
                  <div className="card-content">{archivedData.content}</div>
                  <footer className="card-footer">
                    <div className="icon-wrapper">
                    <i
                      title="restore"
                      className="bi bi-arrow-up-square-fill m-32"
                      onClick={() => archiveRestoreHandler(archivedData._id)}
                    ></i>
                    <i
                      title="delete"
                      className="bi bi-trash-fill m-32"
                      onClick={() => archiveDeleteHandler(archivedData._id)}
                    ></i>
                    </div>
                    
                  </footer>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export { Archive };
