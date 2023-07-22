import { useState } from 'react';
import { addNote } from '../../services/notes.service';
import DialogComponent from '../utils/DialogComponent';
export default function AddNoteForm(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const mediaID = props.mediaID;

  const postNote = e => {
    e.preventDefault();
    const note = { title: title, content: content, mediaID: mediaID };
    addNote(note).then(() => {
      setTitle('');
      setContent('');
    });
  };

  return (
    <>
      <DialogComponent
        buttonText="Add Note"
        cmpnt={
          <div className="note-form">
            <form onSubmit={postNote}>
              <input
                type="text"
                value={title}
                placeholder="Enter Title"
                onChange={e => setTitle(e.target.value)}
                autoFocus={true}
                required
              />
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Enter notes"
                required
              ></textarea>
              <input type="submit" value="Post" />
            </form>
          </div>
        }
      />
    </>
  );
}
