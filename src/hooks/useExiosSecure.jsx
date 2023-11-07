import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export const axiosSecure = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
});

const useAxiosSecure = () => {
    const {logOut} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.request.use(res => {
            return res;
        }, error => {
            console.log(error);
            console.log("Error tracked in the interceptor", error?.response);
            if(error?.response?.status === 401 || error?.response?.status === 403) {
                console.log("logout the user!");
                logOut()
                .then(() => {
                    toast.success("User logged out!");
                    navigate("/");
                }).catch(error => console.log(error));
            }
        })
    }, []);

    return axiosSecure;
};

export default useAxiosSecure;