import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import InitNodes from './node';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { CollaborationPlugin } from '@lexical/react/LexicalCollaborationPlugin';
import {
	createWebsocketProvider,
	getRandomCursorColor,
	UserProfile,
} from './collaboration';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Provider } from '@lexical/yjs';
import * as Y from 'yjs';

interface ActiveUserProfile extends UserProfile {
	userId: number;
}

export default function OrancoEditor({ username, documentId }) {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [yjsProvider, setYjsProvider] = useState<null | Provider>(null);
	const [connected, setConnected] = useState(false);
	const [activeUsers, setActiveUsers] = useState<ActiveUserProfile[]>([]);

	const initialConfig = {
		namespace: 'oranco',
		nodes: [...InitNodes],
		onError: (error) => {
			console.error(error);
		},
	};

	const handleAwarenessUpdate = useCallback(() => {
		const awareness = yjsProvider!.awareness!;
		console.log('Awareness update:', awareness.getStates().entries());
		setActiveUsers(
			Array.from(awareness.getStates().entries()).map(
				([userId, { color, name }]) => ({
					color,
					name,
					userId,
				})
			)
		);
	}, [yjsProvider]);

	useEffect(() => {
		if (yjsProvider == null) {
			return;
		}

		yjsProvider.awareness.on('update', handleAwarenessUpdate);

		return () => yjsProvider.awareness.off('update', handleAwarenessUpdate);
	}, [yjsProvider, handleAwarenessUpdate]);

	const providerFactory = (id: string, yjsDocMap: Map<string, Y.Doc>) => {
		console.log(id, yjsDocMap);
		const provider = createWebsocketProvider(id, yjsDocMap);
		return provider;
	};

	return (
		<div ref={containerRef}>
			<LexicalComposer initialConfig={initialConfig}>
				<CollaborationPlugin
					id={documentId}
					providerFactory={providerFactory}
					shouldBootstrap={false}
					username={username}
					cursorColor={getRandomCursorColor()}
					cursorsContainerRef={containerRef}
				/>
				<RichTextPlugin
					contentEditable={<ContentEditable />}
					placeholder={<div>Enter some text...</div>}
					ErrorBoundary={LexicalErrorBoundary}
				/>
				<MarkdownShortcutPlugin />
				<HistoryPlugin />
				<AutoFocusPlugin />
			</LexicalComposer>
		</div>
	);
}
