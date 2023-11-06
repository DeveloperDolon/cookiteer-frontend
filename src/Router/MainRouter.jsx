import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Page/Home";
import Login from "../Page/Login";
import Register from "../Page/Register";
import AddFood from "../Page/AddFood";
import AvailableFoods from "../Page/AvailableFoods";

const MainRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/add-food",
                element: <AddFood></AddFood>
            }, 
            {
                path: "/available-foods",
                element: <AvailableFoods></AvailableFoods>
            }
        ]
    }, 
    {
        path: "/login",
        element: <Login></Login>
    },
    {
        path: "/register",
        element: <Register></Register>
    }
])

export default MainRouter;