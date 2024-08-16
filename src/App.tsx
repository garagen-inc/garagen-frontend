import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./screens/auth/Login";
import { Register } from "./screens/auth/Register";
import { Home } from "./screens/home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
