import axios from "axios";
import React, { useState } from "react";
import { useAuth, useData } from "../context";
import "../css/note-card.css";
import { NotesInput } from "./NotesInput";

function NoteCard({ notesData }) {
  const { token } = useAuth();
  const { state, dispatch } = useData();
  const [edit, setEdit] = useState();

  async function deleteHandler() {
    try {
      const response = await axios.delete(`/api/notes/${notesData._id}`, {
        headers: {
          authorization: token,
        },
      });

      if (response.status === 200 || response.status === 201) {
        const deletedData = state.notes.filter(
          (item) => item._id === notesData._id
        )[0];
        console.log({ deletedData });
        dispatch({ type: "TRASH", payload: deletedData });
        dispatch({ type: "ADD_NOTES", payload: { note: response.data.notes } });
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  async function archiveHandler() {
    try {
      const response = await axios.post(
        `/api/notes/archives/${notesData._id}`,
        { notesData },
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

  function editHandler() {
    setEdit(true);
  }

  return (
    <>
      {edit ? (
        <NotesInput data={notesData} setEdit={setEdit} />
      ) : (
        <div className="card-container">
          <div
            className="card card-without-image"
            style={{ backgroundColor: notesData.backgroundColor }}
          >
            <div className="heading">
              <div className="card-title">{notesData.title}</div>
              <div className="card-sub-title label">{notesData.label}</div>
            </div>
            <div className="card-content">{notesData.content}</div>
            <footer className="card-footer">
              <div className="d-flex">{notesData.dateCreated}</div>
              <div className="icon-wrapper d-flex">
                <i
                  title="edit"
                  className="bi bi-pencil-square m-32"
                  onClick={editHandler}
                ></i>
                <i
                  title="archive"
                  className="bi bi-archive-fill m-32"
                  onClick={archiveHandler}
                ></i>
                <i
                  title="delete"
                  className="bi bi-trash-fill m-32"
                  onClick={deleteHandler}
                ></i>
              </div>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}

export { NoteCard };
