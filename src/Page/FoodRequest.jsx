import { useContext, useEffect, useState } from "react";
import { axiosSecure } from "../hooks/useExiosSecure";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import animationData from "../../public/Animation - 1699287520981.json";


const FoodRequest = () => {
    const { user, logOut, setUser, setLoading } = useContext(AuthContext);
    const [requestFoodData, setRequestData] = useState([]);
    const navigate = useNavigate();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    useEffect(() => {
        axiosSecure.get(`/api/v1/food-requests?email=${user?.email}`)
            .then(res => {
                setRequestData(res.data)
            })
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
    }, []);

    const handleRemoveRequest = (id) => {
        const removeRequestId = toast.loading("Request canceling...")
        axiosSecure.delete(`/api/v1/food-requests/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {

                    const newRequestData = requestFoodData.filter(food => food._id !== id);
                    setRequestData(newRequestData);

                    toast.success("Request cancelled!", { id: removeRequestId });
                }
            }).catch(err => {
                toast.success(err.message, { id: removeRequestId });
            })
    }

    return (
        <div className="bg-[#fafafa]">
            <div className="max-w-7xl mx-auto lg:px-0 md:px-5 px-3 py-16">
                <div style={{
                    background: `url('https://img.freepik.com/free-photo/hand-giving-soup-bowl-needy-person_23-2148733816.jpg?w=740&t=st=1699379119~exp=1699379719~hmac=1f22f2d30ec62afd3e14eebe7840231f8ffbea1fb85757d59ec72a70c2783ab2') no-repeat center center`,
                    backgroundSize: "cover"
                }} className="overflow-hidden rounded-xl shadow-lg relative py-36">
                    <h1 className="md:text-5xl text-3xl font-bold text-center relative z-30 text-white">Foods Request</h1>

                    <p className="relative z-20 text-white text-center mt-5 md:w-[70%] mx-auto w-[90%] md:text-base text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui velit praesentium, placeat facilis ex reiciendis, dignissimos repellat nostrum quas optio nesciunt fuga ut accusamus suscipit sit cum provident ipsam corrupti.
                    </p>

                    <span className="overlayz"></span>
                </div>

                {
                    requestFoodData.length > 0 ? <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 mt-28">
                        {
                            requestFoodData?.map(food => <div className="grid md:grid-cols-2 grid-cols-1 shadow-lg rounded-xl overflow-hidden" key={food._id}>
                                <div>
                                    <img className="w-full h-full object-cover" src={food?.foodImage} alt="" />
                                </div>

                                <div className="px-5 py-4">
                                    <h3 className="md:text-xl text-lg font-semibold">Food Name : {food.foodName}</h3>
                                    <p className="md:text-sm text-xs font-semibold my-2">Donar Name : {food?.donarName}</p>

                                    <p className="md:text-sm text-xs font-semibold">Pickup Location : {food?.pickUpLocation}</p>

                                    <p className="md:text-sm text-xs font-semibold my-2">Donation Amount : {food?.donateMoney} $</p>

                                    <p className="md:text-sm text-red-500 text-xs font-semibold">Expired Date : {food?.expiredDate}</p>

                                    <p className="md:text-sm  text-xs font-semibold my-2">Request Date : {food?.requestDate}</p>


                                    <div className="flex justify-between gap-3 flex-wrap items-center">
                                        <p className={`md:text-sm w-fit px-2 text-white py-1 ${food?.status === "Available" ? "bg-amber-500" : "bg-green-500"} rounded-lg text-xs font-semibold`}> Status : {food?.status}</p>

                                        {
                                            food?.status === "Available" ? <button
                                                onClick={() => handleRemoveRequest(food._id)}
                                                className="btn btn-sm capitalize bg-red-500 text-white hover:text-black">Cancel Request</button> : ""
                                        }

                                    </div>
                                </div>
                            </div>)
                        }
                    </div> : <div className="md:col-span-2">
                            <Lottie
                                className="md:w-[30%] w-[80%] mx-auto"
                                options={defaultOptions}
                                animationData={animationData}
                                height={200}
                                width={200}
                            ></Lottie>
                            <h2 className="md:text-4xl text-2xl font-bold text-center text-green-500">You have no product Request!</h2>
                        </div>

                }


            </div>
        </div>
    );
};

export default FoodRequest;