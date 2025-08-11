import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./components/Auth/Login";
import Home from "./Pages/Home";
import RequiredAuth from "./components/Common/RequiredAuth";
import PersistLogin from "./components/Common/PersistLogin";
import Register from "./components/Auth/Register";
import Attendance from "./Pages/Attendance";
import NotFoundPage from "./components/Common/404Error";
import Students from "./Pages/Students";
import Batch from "./Pages/Batch";
import Course from "./Pages/Course";
import Section from "./Pages/Section";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <NotFoundPage/>,
    children: [

      {element: <PersistLogin/>,
        children: [
          {element: <RequiredAuth />,
            children: [
              {path: "home", element: <Home/>,
                children: [
                  {index: true, element: <Attendance/>},
                  {path: "attendance", element: <Attendance/>},
                  {path: "students", element: <Students/>},
                  {path: "batch", element: <Batch/>},
                  {path: "course", element: <Course/>},
                  {path: "section", element: <Section/>},

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