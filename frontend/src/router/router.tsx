import { createHashRouter } from 'react-router';
import LoginPage from '../pages/login';
import HomePage from '../pages/home';
import DocumentPage from '../pages/document';

export const router = createHashRouter([
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '/document/:id',
		element: <DocumentPage />,
	},
	{
		path: '/login',
		element: <LoginPage />,
	},
]);
