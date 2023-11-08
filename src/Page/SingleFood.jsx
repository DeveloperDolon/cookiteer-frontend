import { useLoaderData } from "react-router-dom";
import { BiSolidTime } from 'react-icons/bi';
import { FaLocationDot } from "react-icons/fa6";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import moment from "moment";
import toast from "react-hot-toast";
import { axiosSecure } from "../hooks/useExiosSecure";
import { Helmet } from "react-helmet";

const SingleFood = () => {
    const { defaultImage, user} = useContext(AuthContext);
    const foodData = useLoaderData();

    const handleRequestFood = (e) => {
        e.preventDefault();
        document.getElementById("close-btn").click();

        if(user?.email === foodData?.donarEmail) {
            toast.error("You can't request your foods😬😬!");
            return;
        }

        const foodRequestLoading = toast.loading("Food Requesting...");

        const foodName = foodData?.foodName;
        const foodImage = foodData?.foodImage;
        const foodId = foodData?._id;
        const expiredDate = foodData?.expiredDate;
        const donarEmail = foodData?.donarEmail;
        const donarName = foodData?.donarName;
        const pickUpLocation = foodData?.pickUpLocation;
        const requestDate = e.target.requestDate.value;
        const donateMoney = e.target.donateMoney.value;
        const additionalNotes = e.target.additionalNotes.value;
        const requesterName = user?.displayName;
        const requesterEmail = user?.email;
        const requesterImage = user?.photoURL;
        const status = "Available";

        const foodRequestData = { foodName, foodImage, foodId, expiredDate, donarEmail, donarName, requesterName, requesterEmail, pickUpLocation, requestDate, donateMoney, additionalNotes, requesterImage, status };

        axiosSecure.post("/api/v1/food-requests", {...foodRequestData})
        .then(res => {
            if(res.data.insertedId) {
                toast.success("Request Completed!!", {id : foodRequestLoading});
            }
        })
        .catch(err => {
            if(err.response.status === 409) {
                toast.error("Already Requested!", {id: foodRequestLoading})
            } else {
                toast.error(err.message, {id: foodRequestLoading})
            }
            
        });

    }

    return (
        <div className="bg-[#fafafa] md:pb-32 pb-20">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Cookiteer | {foodData?.foodName}</title>
            </Helmet>
            <div className="max-w-7xl mx-auto lg:px-0 md:px-5 px-3">
                <div className="pt-16 grid md:grid-cols-4 grid-cols-1">
                    <div className="md:col-span-3">
                        <h1 className="md:text-5xl text-3xl font-bold">{foodData?.foodName}</h1>

                        <div className="flex gap-5 flex-wrap items-center my-3">

                            <div className="flex gap-2 items-center">
                                <img className="w-8 h-8 object-cover rounded-full border-2 border-lime-400" src={foodData?.donarPhoto ? foodData.donarPhoto : defaultImage} alt="" />

                                <p className="md:text-sm text-xs font-bold">{foodData?.donarName}</p>
                            </div>

                            <p className="flex gap-2 items-center font-bold"><BiSolidTime className="text-lime-500 md:text-2xl text-lg"></BiSolidTime>{foodData?.expiredDate}</p>
                            <p className="flex gap-1 items-center">
                                <FaLocationDot className="text-lime-500 md:text-2xl text-lg"></FaLocationDot>
                                <span className="font-bold">{foodData?.pickUpLocation}</span>
                            </p>
                            <p className="font-bold">Food Quantity : {foodData?.foodQuantity} (no. of person to be served)</p>
                        </div>

                        <div className="mt-7">
                            <img className="w-full md:h-[450px] h-[350px] object-cover" src={foodData?.foodImage} alt="" />

                            <div className="my-8">
                                {foodData?.additionalNotes}
                            </div>
                            <div>
                                <button onClick={() => document.getElementById('my_modal_5').showModal()} className="btn bg-green-500 text-white hover:text-gray-500">Request For Food</button>
                                {/* Open the modal using document.getElementById('ID').showModal() method */}
                                <dialog id={`my_modal_5`} className="modal modal-bottom sm:modal-middle">
                                    <div className="modal-box">
                                        <div>
                                            <div className="mb-6">
                                                <img className=" rounded-xl" src={foodData?.foodImage} alt="" />
                                            </div>
                                            <form onSubmit={handleRequestFood} className="grid grid-cols-1 gap-5">
                                                <label className="font-bold md:text-xl text-lg pt-1">Food Name : 
                                                    <input type="text" className="w-full mt-2 py-2 px-3 bg-gray-100 rounded-lg" name="foodName" value={foodData?.foodName} readOnly id="" />
                                                </label>

                                                <label className="font-medium md:text-sm text-xs pt-1">Food Quantity : (no. of person to be served.)
                                                    <input type="text" className="w-full mt-2 py-2 px-3 bg-gray-100 rounded-lg" name="foodQuantity" value={foodData?.foodQuantity} readOnly id="" />
                                                </label>
                                                
                                                <label className="font-medium md:text-sm text-xs pt-1">Food Id :
                                                    <input type="text" className="w-full mt-2 py-2 px-3 bg-gray-100 rounded-lg" name="foodId" value={foodData?._id} readOnly id="" />
                                                </label>
                                                
                                                <label className="font-medium md:text-sm text-xs pt-1">Donar Email :
                                                    <input type="text" className="w-full mt-2 py-2 px-3 bg-gray-100 rounded-lg" name="donarEmail" value={foodData?.donarEmail} readOnly id="" />
                                                </label>
                                                
                                                <label className="font-medium md:text-sm text-xs pt-1">Donar Name :
                                                    <input type="text" className="w-full mt-2 py-2 px-3 bg-gray-100 rounded-lg" name="donarName" value={foodData?.donarName} readOnly id="" />
                                                </label>
                                                
                                                <label className="font-medium md:text-sm text-xs pt-1">User Email :
                                                    <input type="text" className="w-full mt-2 py-2 px-3 bg-gray-100 rounded-lg" name="userEmail" value={user?.email} readOnly id="" />
                                                </label>
                                                
                                                <label className="font-medium md:text-sm text-xs pt-1">Request Date :
                                                    <input type="text" className="w-full mt-2 py-2 px-3 bg-gray-100 rounded-lg" name="requestDate" value={moment(new Date()).format("lll")} readOnly id="" />
                                                </label>
                                                
                                                <label className="font-medium md:text-sm text-xs pt-1">Pickup Location : 
                                                    <input type="text" className="w-full mt-2 py-2 px-3 bg-gray-100 rounded-lg" name="pickUpLocation" value={foodData?.pickUpLocation} readOnly id="" />
                                                </label>
                                                
                                                <label className="font-medium md:text-sm text-xs pt-1">Expired Date :
                                                    <input type="text" className="w-full mt-2 py-2 px-3 bg-gray-100 rounded-lg" name="expiredDate" value={foodData?.expiredDate} readOnly id="" />
                                                </label>
                                                
                                                <label className="font-medium md:text-sm text-xs pt-1">Donate Money : $
                                                    <input type="number" min="1" className="w-full mt-2 py-2 px-3 bg-gray-100 rounded-lg" defaultValue={5} name="donateMoney" id="" />
                                                </label>

                                                <label className="font-medium md:text-sm text-xs pt-1">Additional Notes : 
                                                    <textarea name="additionalNotes" id="" className="w-full border-2 px-3 py-4 border-black rounded-lg" cols="20" rows="5" ></textarea>
                                                </label>
                                                <div>
                                                    <button type="submit" className="btn bg-lime-500 text-white">Request</button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="modal-action">
                                            <form method="dialog" className="space-x-5">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button id="close-btn" className="btn bg-red-500 text-white">Close</button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
                            </div>
                        </div>
                    </div>

                    <div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleFood;