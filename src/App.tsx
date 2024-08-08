import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Login } from "./screens/login/Login"
import { Home } from "./screens/home/Home"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
