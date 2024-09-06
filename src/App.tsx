import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./screens/auth/Login";
import { RegisterUser } from "./screens/auth/RegisterUser";
import { RegisterUserWorkshop } from "./screens/auth/RegisterUserWorkshop";
import { Home } from "./screens/home/Home";
import Workshop from "./screens/workshop/Workshop";
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
    path: "/registeruser",
    element: <RegisterUser />,
  },
  {
    path: "/registerworkshop",
    element: <RegisterUserWorkshop />,
  },
  {
    path: "/workshop",
    element: <Workshop />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
