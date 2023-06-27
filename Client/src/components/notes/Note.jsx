import { useState } from "react";
import "../../sass/notes/Note.scss";
export default function Note(props) {
  const note = props.note;
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  return (
    <div className="note">
      <input
        type="text"
        value={title}
        placeholder="Enter Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter notes"
      ></textarea>
      <p>Created On {note.dateAdded}</p>
      {note.lastUpdated? (note.lastUpdated): (<></>)}
    </div>
  );
}
