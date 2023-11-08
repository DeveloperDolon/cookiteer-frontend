import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosSecure } from "../hooks/useExiosSecure";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import animationData from "../../public/Animation - 1699287520981.json";
import Lottie from "lottie-react";
import { Helmet } from "react-helmet";


const ManageFoodRequest = () => {
    const { user, logOut, setLoading, setUser } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const { id } = useParams();
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
        axiosSecure.get(`/api/v1/manage-food-requests?id=${id}&email=${user?.email}`)
            .then(res => {
                setRequests(res.data);
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

    const handleSetStatus = (id, foodId) => {
        const setStatusId = toast.loading("Food delivering...");
        axiosSecure.patch(`/api/v1/manage-food-requests?id=${id}&foodId=${foodId}`)
            .then(res => {
                console.log(res)
                const findStatus = requests.find(req => req._id === id);
                const filterStatus = requests.filter(request => request._id !== id);
                findStatus.status = "Delivered";
                setRequests([findStatus, ...filterStatus]);
                toast.success("Food delivered!", {id: setStatusId})
            })
            .catch(err =>{
                toast.err(err.message, {id: setStatusId})
            });
    }

    return (
        <div className="bg-[#fafafa]">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Cookiteer | Manage Food Request</title>
            </Helmet>
            <div className="max-w-7xl mx-auto lg:px-0 md:px-5 px-3 py-16">
                <div style={{
                    background: `url('https://img.freepik.com/free-photo/people-bringing-supplies-neighbors_23-2149139793.jpg?w=740&t=st=1699384641~exp=1699385241~hmac=d79f4091ab0c8e10eabd6194e33585787d915f83a6bf42a58524c711befe6cf8') no-repeat center center`,
                    backgroundSize: "cover"
                }} className="overflow-hidden rounded-xl shadow-lg relative py-36">
                    <h1 className="md:text-5xl text-3xl font-bold text-center relative z-30 text-white">Foods Request</h1>

                    <p className="relative z-20 text-white text-center mt-5 md:w-[70%] mx-auto w-[90%] md:text-base text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui velit praesentium, placeat facilis ex reiciendis, dignissimos repellat nostrum quas optio nesciunt fuga ut accusamus suscipit sit cum provident ipsam corrupti.
                    </p>

                    <span className="overlayz"></span>
                </div>

                {
                    requests.length > 0 ?
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 my-20 mt-20 gap-10">
                            {
                                requests?.map(request => <div className="bg-white rounded-xl shadow-2xl pt-10" key={request._id}>
                                    <div className="relative mx-auto overflow-auto">
                                        <div className="">
                                            <img className="md:w-[200px] border-4 border-lime-500 md:h-[200px] w-[100px] h-[100px] rounded-full mx-auto object-cover" src={request?.requesterImage} alt="" />
                                        </div>
                                    </div>

                                    <div className="px-7 py-6 text-center space-y-2">
                                        <p className="md:text-xl text-lg font-semibold">Requester Name : {request.requesterName}</p>
                                        <p className="md:text-base text-sm font-semibold">Requester Email : {request.requesterEmail}</p>
                                        <p className="md:text-base text-sm font-semibold">Request Date : {request.requestDate}</p>
                                        <p className="md:text-base text-sm font-semibold">Additional Notes : {request.additionalNotes}</p>

                                        <div className="flex justify-between flex-wrap items-center py-2">
                                            <p className={`md:text-sm text-xs font-semibold px-2 py-1 w-fit rounded-lg ${request.status === "Available" ? "bg-amber-500" : "bg-green-500"} text-white`}>Status : {request.status === "Available" ? "Pending..." : request.status}</p>
                                            {
                                                request.status === "Available" ? <button
                                                    onClick={() => handleSetStatus(request._id, request.foodId)}
                                                    className="btn btn-sm bg-green-300 ">Change To Delivered</button> : ""
                                            }
                                        </div>
                                    </div>
                                </div>)
                            }
                        </div>
                        :
                        <div className="md:col-span-2">
                            <Lottie
                                className="md:w-[30%] w-[80%] mx-auto"
                                options={defaultOptions}
                                animationData={animationData}
                                height={200}
                                width={200}
                            ></Lottie>
                            <h2 className="md:text-4xl text-2xl font-bold text-center text-green-500">There is no product Request!</h2>
                        </div>
                }


            </div>
        </div>
    );
};

export default ManageFoodRequest;