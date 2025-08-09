import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./components/Auth/Login";
import Home from "./components/Pages/Home";
import RequiredAuth from "./components/Common/RequiredAuth";
import Welcome from "./components/Pages/Welcome";
import PersistLogin from "./components/Common/PersistLogin";
import Register from "./components/Auth/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {index: true, element: <Home/>},
      {path: "home", element: <Home/>},

      {element: <PersistLogin/>,
        children: [
          {element: <RequiredAuth />,
            children: [
              {path: "welcome", element: <Welcome />}
            ]
          }
        ]
      }
      
    ]
  },
  {path: "login", element: <Login/>},
  {path: "register", element: <Register/>},
])