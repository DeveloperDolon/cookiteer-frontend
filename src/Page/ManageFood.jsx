import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useExiosSecure";
import { AuthContext } from "../Provider/AuthProvider";


const ManageFood = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [myFoods, setMyFoods] = useState([]);

    useEffect(() => {
        axiosSecure.get(`/api/v1/foods?email=${user.email}`)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }, [axiosSecure, user.email]);

    return (
        <div>
            Hello world            
        </div>
    );
};

export default ManageFood;