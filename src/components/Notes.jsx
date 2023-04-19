import {
  setLocalStorage,
  readAllLocalStorage,
  readLocalStorageItem,
  removeFromStorage,
  clearLocalStorage,
} from "../assets/funcs/localStorage";
import { useState, useEffect } from "react";
import { Input } from "./Input";
import { Note } from "./Note";
/* 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log(formValues);
  };
*/
export const Notes = () => {
  // useState that stores visibility of <Input/> component
  const [addInput, setAddInput] = useState(false);
  // useState that stores values of input fields as objects
  const [noteVal, setNoteVal] = useState({});
  // useState that stores errorValue that happens if incorrectly formatted note is added
  const [errState, setErrState] = useState(false);
  // useState that stores all fields from localStorage
  const [localKeys, setLocalKeys] = useState([]);
  // useState that changes on deletion of localStorage item
  const [deletion, setDeletion] = useState(false);
  // useState that changes if the note is being edited or not
  const [editStatus, setEditStatus] = useState(false);
  // useEffect that runs whenever new input has been made
  useEffect(() => {
    setLocalKeys(Object.keys(readAllLocalStorage()));
  }, [addInput, deletion]);
  // function that toggles <Input/> component visibility
  const showInput = () => {
    if (addInput === false) setAddInput(true);
    if (addInput === true) setAddInput(false);
  };
  // function that changes state of noteVal on every keystroke on inputs
  const handleInput = (e) => {
    const { name, value } = e.target; // takes e.target.name & e.targer.value
    const id = String(Date.now()).slice(-3);
    setNoteVal({ id: id, ...noteVal, [name]: value });
  };
  // function that changes state of noteVals on submission of new note
  const addNoteToStorage = () => {
    if (!noteVal.title && !noteVal.body) {
      console.error("Note must have at least body or title");
      setErrState(true);
      return;
    }
    if (noteVal.title === undefined) noteVal.title = "";
    if (noteVal.body == undefined) noteVal.body = "";
    setErrState(false);
    // adds key than a stringified object like syntax as a value 🔻
    // this can be used similar to an object when adressing by index values🔻
    // ( 0-title, 1-body, 2-category ❗category not implemented yet❗)🔻
    const inVal = `${String(noteVal.title)}|${String(noteVal.body)}`;
    // adds noteVal to localStorage
    setLocalStorage(noteVal.id, inVal);
    // hides inputFields
    setAddInput(false);
    // remember to set noteVal to empy val after finishing this func ❗
    setNoteVal({});
  };
  return (
    <div className="Notes--component">
      <div className="Header--div">
        <h2> My notes </h2>
        {/* Button that calls function to add new note */}
        <button className="Show--input--button" onClick={showInput}>
          +
        </button>
      </div>
      {/* Creates input component if addInput state is true */}
      {addInput ? (
        <Input
          handleInput={handleInput}
          addNoteToStorage={addNoteToStorage}
          errorState={errState}
        />
      ) : null}
      {localKeys.length > 1 && (
        <div className="remove--all--wrapper">
          <button
            className="remove--note--buton"
            onClick={() => {
              const confirmation = confirm(
                "This will delete all notes \n are you sure?"
              );
              if (!confirmation) return;
              clearLocalStorage();
              setDeletion(true);
              deletion && setDeletion(false);
            }}
          >
            REMOVE ALL
          </button>
        </div>
      )}

      {/* Creates red outline around inputs and shows error message if formatting error */}
      {errState && (
        <h4 className="formatting--error">
          Note must contain at least title or body
        </h4>
      )}
      {/* Shows all notes in a readable fashion */}
      {localKeys.map((key, i) => {
        // for every localKey renders a Note component and passes key, localKey (TITLE) i(another iterator)
        // setDeletionMethod so useEffect can update and state of deletion method so component can toggle
        return (
          <Note
            key={i}
            localKey={key}
            i={i}
            setDeletion={setDeletion}
            deletion={deletion}
            editStatus={editStatus}
            setEditStatus={setEditStatus}
            setErrState={setErrState}
          />
        );
      })}
    </div>
  );
};
