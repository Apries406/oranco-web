import { createHashRouter } from "react-router";

export const router = createHashRouter([{
  path: '/',
  element: <div>Home</div>
}, {
  path: '/login',
  element: <div>Login</div>
}])
