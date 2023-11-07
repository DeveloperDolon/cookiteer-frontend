import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useExiosSecure";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import bgImage from "../assets/images/hand-giving-food-bowl-needy-person.jpg"
import "./style.css";

const ManageFood = () => {
    const { user, logOut, setUser, setLoading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [myFoods, setMyFoods] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.get(`/api/v1/manage-food?email=${user.email}`)
            .then(res => setMyFoods(res.data))
            .catch(err => {
                console.log(err.response.status)
                if (err?.response?.status === 401 || err?.response?.status === 403) {
                    console.log("logout the user!");
                    logOut()
                        .then(() => {
                            toast.success("User logged out!");
                            setUser(null);
                            setLoading(false);
                            navigate("/");
                        }).catch(error => console.log(error));
                }
            })
    }, [axiosSecure, user.email]);


    return (
        <div className="bg-[#fafafa] py-10">
            <div className="max-w-7xl mx-auto lg:p-0 md:px-5 px-3">
                <div style={{
                    background: `url('${bgImage}') no-repeat center center`,
                    backgroundSize: "cover",
                }} className="relative overflow-hidden rounded-2xl border-8 border-lime-500 shadow-xl">
                    <div className="py-32">
                        <h1 className="md:text-5xl text-3xl font-bold text-white z-30 relative text-center">Manage My Food</h1>

                        <p className="text-center text-white relative z-30 md:w-[70%] w-[95%] mx-auto mt-5 leading-loose">
                            Embark on a seamless culinary adventure with our website&apos;s food management section. Designed with our food connoisseurs in mind, this space provides an intuitive and efficient way to browse, select, and purchase your favorite ingredients.
                        </p>
                    </div>
                    <span className="overlayz"></span>
                </div>

                <div className="space-y-10 mt-20">

                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Expired Date</th>
                                    <th>Action</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}

                                {
                                    myFoods?.map(food => <>
                                        <tr>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={food?.foodImage} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{food?.foodName}</div>
                                                        <div className="text-sm badge bg-lime-500 text-white">{food?.pickUpLocation}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="md:text-sm text-xs font-medium bg-lime-500 p-1 rounded-lg text-white">{food?.expiredDate}</span>
                                            </td>
                                            <td>
                                                <div  className="flex h-full justify-center gap-4">
                                                    <Link to={`/update-food/${food._id}`} className="btn btn-xs bg-lime-500 text-white rounded-lg">Update</Link>
                                                    <button className="btn btn-xs bg-red-500 text-white rounded-lg">Delate</button>
                                                </div>
                                            </td>
                                            <th>
                                                <button className="btn btn-ghost btn-xs border border-lime-500">Manage</button>
                                            </th>
                                        </tr>
                                    </>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageFood;