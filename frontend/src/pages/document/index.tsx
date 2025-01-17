import { useParams } from 'react-router';
import OrancoEditor from '../../components/editor';
import { useUserStore } from '../../store/user';

export default function DocumentPage() {
	const { id } = useParams();
	const user = useUserStore((state) => state.user);
	return (
		<div>
			<h1>Document {id}</h1>
			<div className='editorContainer'>
				<OrancoEditor
					documentId={id}
					username={user?.username}
				/>
			</div>
		</div>
	);
}
