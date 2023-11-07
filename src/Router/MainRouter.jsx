import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Page/Home";
import Login from "../Page/Login";
import Register from "../Page/Register";
import AddFood from "../Page/AddFood";
import AvailableFoods from "../Page/AvailableFoods";
import SingleFood from "../Page/SingleFood";
import PrivateRoute from "./PrivateRoute";
import ManageFood from "../Page/ManageFood";

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
                element: <PrivateRoute><AddFood></AddFood></PrivateRoute>
            }, 
            {
                path: "/available-foods",
                element: <AvailableFoods></AvailableFoods>
            },
            {
                path: "/food/:id",
                loader: ({params}) => fetch(`http://localhost:5000/api/v1/foods/${params.id}`),
                element: <PrivateRoute><SingleFood></SingleFood></PrivateRoute>
            },
            {
                path: "/manage-food",
                element: <PrivateRoute><ManageFood></ManageFood></PrivateRoute>
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