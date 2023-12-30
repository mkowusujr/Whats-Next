import { useState } from "react"
import { addNote } from "../../services/notes.service";

export default function AddNote(props) {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')

	const addNewNote = e => {
		e.preventDefault();

		const note = {
			title: title,
			content: content,
			mediaID: props.mediaID
		}

		addNote(note)
			.then(n => {
				props.addToList(n)
				setTitle('');
					setContent('');
			})
		.catch(err => console.error(err))
	}

	return <>
		<h3>Add Note</h3>
		<form onSubmit={addNewNote}>
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
			> 
			</textarea>
			<input type="submit" value="Add Note" />
		</form>
	</>
}