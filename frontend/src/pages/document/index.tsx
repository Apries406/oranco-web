import { useParams } from 'react-router';
import OrancoEditor from '../../components/editor';

export default function DocumentPage() {
	const { id } = useParams();
	return (
		<div>
			<h1>Document {id}</h1>
			<div className='editorContainer'>
				<OrancoEditor />
			</div>
		</div>
	);
}
