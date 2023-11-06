import { useLoaderData } from "react-router-dom";
import { BiSolidTime } from 'react-icons/bi';
import { FaLocationDot } from "react-icons/fa6";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const SingleFood = () => {
    const { defaultImage } = useContext(AuthContext);
    const foodData = useLoaderData();

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
                                <button className="btn bg-green-500 text-white hover:text-gray-500">Request For Food</button>
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