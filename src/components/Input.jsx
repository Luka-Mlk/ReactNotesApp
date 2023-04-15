export const Input = ({ handleInput, addNoteToStorage, errorState }) => {
  return (
    <div className="Input--component">
      <div className="Input--component--inner--wrapper">
        <div className="inputs--wrapper">
          <input
            name="title"
            className="Title--input input"
            type="text"
            placeholder="Title"
            onChange={handleInput}
            style={
              errorState ? { border: "3px solid red" } : { border: "none" }
            }
          />
          <input
            name="body"
            className="Body--input input"
            type="text"
            placeholder="Body"
            onChange={handleInput}
            style={
              errorState ? { border: "3px solid #d13b3b" } : { border: "none" }
            }
          />
        </div>
        <button className="Add--note--button" onClick={addNoteToStorage}>
          Add note
        </button>
      </div>
    </div>
  );
};
