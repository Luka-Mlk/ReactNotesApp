import {
  setLocalStorage,
  readAllLocalStorage,
  readLocalStorageItem,
  removeFromStorage,
  clearLocalStorage,
} from "../assets/funcs/localStorage";
export const Note = ({ localKey, i, setDeletion, deletion }) => {
  // this removes my formatting "key|val" removes quotation marks
  const itemFromLocal = readLocalStorageItem(localKey);
  if (!itemFromLocal) return;
  const keyPropertiesUnsplit = itemFromLocal.replaceAll('"', "");
  // this splits by the | character giving clean key and val strings
  const keyProperties = keyPropertiesUnsplit.split("|");
  const title = keyProperties[0];
  const body = keyProperties[1];
  // const category = keyProperties[2] - this would be category although not implemented yet
  return (
    <div className="note--div--wrapper" key={i}>
      <div className="note--values">
        <h3>{title}</h3>
        <h2>{body}</h2>
      </div>
      <div className="note--buttons">
        <button
          className="remove--note--buton"
          onClick={() => {
            removeFromStorage(localKey);
            setDeletion(true);
            deletion && setDeletion(false);
          }}
        >
          Remove note
        </button>
      </div>
    </div>
  );
};
