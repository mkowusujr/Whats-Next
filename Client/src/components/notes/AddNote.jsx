import { useState } from 'react';
import { addNote } from '../../services/notes.service';
import { apiToast } from '../../services/api-base.service';

export default function AddNote(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const callAPI = new Promise((res, rej) => {
      const note = {
        title: title,
        content: content,
        mediaID: props.mediaID
      };

      addNote(note)
        .then(n => {
          props.addToList(n);
          setTitle('');
          setContent('');
          res('Successfully added note');
        })
        .catch(err => rej(err));
    });

    apiToast(callAPI);
  };

  return (
    <>
      <h3>Add Note</h3>
      <form onSubmit={handleSubmit}>
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
        <input type="submit" value="Add Note" />
      </form>
    </>
  );
}
