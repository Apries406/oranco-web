import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import InitNodes from './node';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';

export default function OrancoEditor() {
	const initialConfig = {
		namespace: 'oranco',
		nodes: [...InitNodes],
		onError: (error) => {
			console.error(error);
		},
	};
	return (
		<LexicalComposer initialConfig={initialConfig}>
			<RichTextPlugin
				contentEditable={<ContentEditable />}
				placeholder={<div>Enter some text...</div>}
				ErrorBoundary={LexicalErrorBoundary}
			/>
			<MarkdownShortcutPlugin />
			<HistoryPlugin />
			<AutoFocusPlugin />
		</LexicalComposer>
	);
}
