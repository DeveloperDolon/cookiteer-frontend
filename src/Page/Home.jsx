import { useContext, useEffect, useState } from "react";
import Banner from "../Component/Banner/Banner";
import { axiosSecure } from "../hooks/useExiosSecure";
import { AuthContext } from "../Provider/AuthProvider";
import { BiSolidTime } from 'react-icons/bi';
import { FaLocationDot } from 'react-icons/fa6';


const Home = () => {
    const [foods, setFoods] = useState([]);
    const { defaultImage } = useContext(AuthContext);

    useEffect(() => {
        axiosSecure.get("/api/v1/foods")
            .then(res => setFoods(res.data))
            .catch(err => console.log(err.message))
    }, []);

    return (
        <div>
            <Banner></Banner>


            <div className="bg-[#fafafa]">
                <div className="max-w-7xl mx-auto lg:px-0 md:px-5 px-3 md:py-32 py-24">
                    <h1 className="md:text-7xl text-4xl font-extrabold title-text text-center">Featured Foods</h1>
                    <p className="text-center lg:w-[70%] md:w-[80%] w-full mx-auto my-5 md:text-base text-sm md:leading-7 leading-relaxed">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti corrupti accusantium quae error id fugiat nulla architecto alias. Sapiente sequi ab doloremque eligendi officiis, obcaecati unde aliquam mollitia explicabo cumque.
                    </p>

                    <div className="grid md:grid-cols-2 grid-cols-1 gap-8 md:mt-16 mt-10">
                        {
                            foods?.map(food => {

                                return <div className="grid grid-cols-2 bg-white overflow-hidden shadow-xl rounded-xl" key={food._id}>
                                    <div>
                                        <img className="h-full w-full object-cover" src={food.foodImage} alt="" />
                                    </div>

                                    <div className="py-3  px-8">
                                        <div className="flex gap-2 items-center">
                                            <img className="w-8 h-8 object-cover rounded-full border-2 border-lime-400" src={food.donarPhoto ? food.donarPhoto : defaultImage} alt="" />

                                            <p className="md:text-sm text-xs font-bold">{food.donarName}</p>
                                        </div>
                                        <h2 className="md:text-2xl text-lg font-bold mt-2">{food.foodName}</h2>

                                        <p className="md:text-sm text-xs my-1">
                                            {food.additionalNotes.length > 50 ? food.additionalNotes.slice(0, 50) + "..." : food.additionalNotes}
                                        </p>

                                        <p className="md:text-sm text-xs font-medium">Quantity : {food.foodQuantity} (no. of person to be served)</p>

                                        <div className="flex justify-between flex-wrap gap-3 my-2">
                                            <span className="flex gap-1 items-center">
                                                <BiSolidTime className="text-lime-500 md:text-xl text-base"></BiSolidTime>
                                                <span className="md:text-sm text-xs font-medium">{food.expiredDate}</span>
                                            </span>

                                            <span className="flex gap-1 items-center">
                                                <FaLocationDot className="text-lime-500 md:text-xl text-base"></FaLocationDot>
                                                <span className="md:text-sm text-xs font-medium">{food.pickUpLocation}</span>
                                            </span>
                                        </div>

                                        <div>
                                            <button className="bg-[#fafafa] md:px-5 px-3 md:py-3 py-2 rounded-lg shadow-md font-bold md:text-sm text-xs duration-300 hover:bg-slate-500 hover:text-lime-400 text-lime-600">View Details</button>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;