import Select from "../utils/Select";
import { scores, statuses } from "../utils/FormFields";

function MediaItem(props) {
	const m = props.media
	return <tr className="media-item">
		<td>
			{
				m.title +
				(m.subTitle ? " " + m.subTitle : '')
			}
		</td>

		<td>{m.mediaType}</td>
		<td>
			<Select
				value={m.score}
				options={scores}
				onChange={() => { }}
			/>
		</td>
		<td>
			<Select
				value={m.status}
				options={statuses}
				onChange={() => { }}
			/>
		</td>
		<td>More</td>
	</tr>
}

export default MediaItem;