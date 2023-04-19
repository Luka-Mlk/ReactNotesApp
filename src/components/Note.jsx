import { useState } from "react";
import {
  setLocalStorage,
  readAllLocalStorage,
  readLocalStorageItem,
  removeFromStorage,
  clearLocalStorage,
} from "../assets/funcs/localStorage";
export const Note = ({
  localKey,
  i,
  setDeletion,
  deletion,
  editStatus,
  setEditStatus,
  setErrState,
}) => {
  // a useState used for showing inputs or note
  const [editUnique, setEditUnique] = useState(false);
  // useState that stores newly edited values from the edit note fields
  // Note: this is the same useState as noteVals in Notes.jsx but i saw no point overloading the props
  const [newNoteVals, setNewNoteVals] = useState({});
  // Reads the current title and body on this component in bad format
  const itemFromLocal = readLocalStorageItem(localKey);
  if (!itemFromLocal) return;
  // Formats otherwise nonsensical fomatting of data
  const keyPropertiesUnsplit = itemFromLocal.replaceAll('"', "");
  // this splits by the | character giving clean key and val strings
  const keyProperties = keyPropertiesUnsplit.split("|");
  let title = "";
  let body = "";
  if (keyProperties[0]) {
    title = keyProperties[0];
  }
  if (keyProperties[1]) {
    body = keyProperties[1];
  }
  // const category = keyProperties[2] - this would be category although not implemented yet

  // a remade function that updates selected note by given title
  const addNoteToStorage = () => {
    if (!newNoteVals.title && !newNoteVals.body) {
      console.error("Note must have at least body or title");
      setErrState(true);
      return;
    }
    let newTitle = "";
    let newBody = "";
    if (newNoteVals.title) newTitle = newNoteVals.title;
    if (newNoteVals.body) newBody = newNoteVals.body;
    setErrState(false);
    // adds key than a stringified object like syntax as a value 🔻
    // this can be used similar to an object when adressing by index values🔻
    // ( 0-title, 1-body, 2-category ❗category not implemented yet❗)🔻
    const inVal = `${newTitle}|${newBody}`;
    // adds noteVal to localStorage
    setLocalStorage(localKey, inVal);
    // remember to set noteVal to empy val after finishing this func ❗
    setNewNoteVals({});
  };
  // Writes to newNoteVals
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setNewNoteVals({ id: localKey, ...newNoteVals, [name]: value });
  };
  return (
    <div className="note--div--wrapper" key={i}>
      <div className="note--values">
        {/* Changes text field into an input field depending on editStatus */}
        {editUnique ? (
          <input
            className="input Title--input"
            name="title"
            type="text"
            placeholder={title}
            onChange={(e) => {
              handleInputs(e);
            }}
          />
        ) : (
          <h3>{title}</h3>
        )}
        {/* Changes text field into an input field depending on editStatus */}
        {editUnique ? (
          <input
            className="input Body--input"
            name="body"
            type="text"
            onChange={handleInputs}
            placeholder={body}
          />
        ) : (
          <h2>{body}</h2>
        )}
      </div>
      <div className="note--buttons">
        {/* Adds submit button depending on editStatus */}
        {editUnique ? (
          <button
            className="green--button"
            onClick={() => {
              editStatus ? setEditStatus(false) : setEditStatus(true);
              editUnique ? setEditUnique(false) : setEditUnique(true);
              addNoteToStorage();
              setDeletion(true);
              deletion && setDeletion(false);
            }}
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => {
              editStatus ? setEditStatus(false) : setEditStatus(true);
              editUnique ? setEditUnique(false) : setEditUnique(true);
              console.log();
            }}
          >
            Edit
          </button>
        )}
        <button
          className="remove--note--buton"
          onClick={() => {
            removeFromStorage(localKey);
            setDeletion(true);
            deletion && setDeletion(false);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};
