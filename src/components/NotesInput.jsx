import React, { useState } from "react";
import { ChromePicker } from "react-color";
import axios from "axios";
import { useAuth, useData } from "../context/index";
import "../css/notes-input.css";

function NotesInput({ data, setEdit }) {
  const { token } = useAuth();
  const { dispatch } = useData();

  const [colorPalette, setColorPalette] = useState(false);
  const [color, setColor] = useState();

  const date = new Date();

  const initialNote = {
    title: "",
    content: "",
    dateCreated: `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`,
    label: "",
    backgroundColor: "#FFFFFF",
  };

  const [note, setNote] = useState(data ? data : initialNote);

  const addNotesHandler = async () => {
    try {
      let response = null;

      if (data) {
        response = await axios.post(
          `/api/notes/${data._id}`,
          { note },
          {
            headers: {
              authorization: token,
            },
          }
        );
      } else {
        response = await axios.post(
          "/api/notes",
          { note },
          { headers: { authorization: token } }
        );
      }
      console.log(response);

      if (response.status === 200 || response.status === 201) {
        dispatch({ type: "ADD_NOTES", payload: { note: response.data.notes } });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <div className={`${data && "modal"}`}>
        <div className="notes-input-container">
          <header className="notes-header">
            <input
              className="notes-title"
              type="text"
              placeholder="Title"
              value={note.title}
              onChange={(e) =>
                setNote(() => ({ ...note, title: e.target.value }))
              }
            />
            <p>
              <i className="bi bi-pin-fill"></i>
            </p>
          </header>
          <section>
            <textarea
              placeholder="Type Notes"
              className="notes-area"
              value={note.content}
              onChange={(e) =>
                setNote(() => ({ ...note, content: e.target.value }))
              }
            ></textarea>
          </section>
          <footer className="notes-footer">
            <div className="footer-left">
              <input
                type="text"
                placeholder="Label"
                className="notes-label"
                value={note.label}
                onChange={(e) =>
                  setNote(() => ({ ...note, label: e.target.value }))
                }
              />
              <i
                className="bi bi-palette"
                onClick={() => setColorPalette(!colorPalette)}
              ></i>
              {colorPalette && (
                <ChromePicker
                  className="color-palette"
                  color={color}
                  onChange={(newColor) => {
                    setColor(newColor.hex);
                    setNote(() => ({ ...note, backgroundColor: newColor.hex }));
                  }}
                />
              )}
            </div>
            <button
              className="btn btn-primary btn-add"
              onClick={() => {
                addNotesHandler();
                setNote(() => ({
                  title: "",
                  content: "",
                  backgroundColor: note.backgroundColor,
                  dateCreated: note.dateCreated,
                  label: "",
                }));
                data && setEdit(false);
              }}
            >
              Add
            </button>
          </footer>
        </div>
      </div>
    </>
  );
}

export { NotesInput };
