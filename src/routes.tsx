import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./components/Auth/Login";
import Home from "./Pages/Home";
import RequiredAuth from "./components/Common/RequiredAuth";
import PersistLogin from "./components/Common/PersistLogin";
import Register from "./components/Auth/Register";
import Attendance from "./Pages/Attendance";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [

      {element: <PersistLogin/>,
        children: [
          {element: <RequiredAuth />,
            children: [
              {path: "home", element: <Home/>,
                children: [
                  {index: true, element: <Attendance/>},
                  {path: "attendance", element: <Attendance/>}
                ]
              }
            ]
          }
        ]
      }
      
    ]
  },
  {path: "login", element: <Login/>},
  {path: "register", element: <Register/>},
])