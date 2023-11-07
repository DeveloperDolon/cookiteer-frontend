import { useLoaderData } from "react-router-dom";
import { BiSolidTime } from 'react-icons/bi';
import { FaLocationDot } from "react-icons/fa6";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import moment from "moment";

const SingleFood = () => {
    const { defaultImage, user} = useContext(AuthContext);
    const foodData = useLoaderData();

    const handleRequestFood = () => {
        alert(foodData._id);
    }

    return (
        <div className="bg-[#fafafa] md:pb-32 pb-20">
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
                                            <p className="font-bold md:text-xl text-lg pt-1">Food Name : {foodData?.foodName}</p>
                                            <p className="font-medium md:text-sm text-xs pt-1">Food Quantity : {foodData?.foodQuantity} (no. of person to be served.)</p>
                                            <p className="font-medium md:text-sm text-xs pt-1">Food Id : {foodData?._id}</p>
                                            <p className="font-medium md:text-sm text-xs pt-1">Donar Email : {foodData?.donarEmail}</p>
                                            <p className="font-medium md:text-sm text-xs pt-1">Donar Name : {foodData?.donarName}</p>
                                            <p className="font-medium md:text-sm text-xs pt-1">User Email : {user?.email}</p>
                                            <p className="font-medium md:text-sm text-xs pt-1">Request Date : <input type="text" readOnly value={moment(new Date()).format("lll")} name="" id="" /></p>
                                            <p className="font-medium md:text-sm text-xs pt-1">Pickup Location : {foodData?.pickUpLocation}</p>
                                            <p className="font-medium md:text-sm text-xs pt-1">Expired Date : {foodData?.expiredDate}</p>
                                            <p className="font-medium md:text-sm text-xs pt-1">Donate Money : $<input type="number" defaultValue="5"  className="border-2 ml-1 border-black rounded-lg p-1 placeholder:text-xs" placeholder="Donate Money" min="1" name="money" id="" /></p>
                                            <p className="font-medium md:text-sm text-xs pt-1">Additional Notes : 
                                                <textarea name="notes" id="" className="w-full border-2 px-3 py-4 border-black rounded-lg" cols="20" rows="5" ></textarea>
                                            </p>
                                        </div>
                                        <div className="modal-action">
                                            <form method="dialog" className="space-x-5">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button onClick={handleRequestFood} className="btn bg-lime-500 text-white">Request</button>
                                                <button className="btn">Close</button>
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