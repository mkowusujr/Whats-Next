import { useState } from 'react';

import { deleteNote, updateNote } from '../../services/notes.service';

export default function Note(props) {
  const [title, setTitle] = useState(props.note.title);
  const [content, setContent] = useState(props.note.content);

  const updateNoteContents = e => {
    e.preventDefault();

    const note = {
      id: props.note.id,
      title: title,
      content: content
    };

    updateNote(note).catch(err => console.error(err));
  };

  const handleDelete = () => {
    deleteNote(props.note.id)
      .then(() => {
        props.removeFromList(props.note.id);
      })
      .catch(err => console.error(err));
  };

  return (
    <li>
      <form onSubmit={updateNoteContents}>
        <input
          type="text"
          value={title}
          name="title"
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          value={content}
          name="content"
          onChange={e => setContent(e.target.value)}
          required
        ></textarea>
        <input type="submit" value="Update Note" />
      </form>
      <button onClick={handleDelete}>Delete Note</button>
    </li>
  );
}
