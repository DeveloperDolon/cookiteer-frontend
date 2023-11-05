import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Page/Home";
import Login from "../Page/Login";

const MainRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            }
        ]
    }, {
        path: "/login",
        element: <Login></Login>
    }
])

export default MainRouter;