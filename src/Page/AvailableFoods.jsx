
import { useEffect, useState } from "react";
import { axiosSecure } from "../hooks/useExiosSecure";
import FoodItem from "../Component/FoodItem/FoodItem";
import animationData from "../../public/Animation - 1699287520981.json";
import Lottie from "lottie-react";

const AvailableFoods = () => {
    const [category, setCategory] = useState("");
    const [sortItem, setSortItem] = useState("");
    const [foods, setFoods] = useState([]);
    const [sort, setSort] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    useEffect(() => {
        setIsLoading(true);
        axiosSecure.get(`/api/v1/foods?sortItem=${sortItem}&sort=${sort}&category=${category}`)
            .then(res => {
                setFoods(res.data);
                setIsLoading(false);
            })
            .catch(err => console.log(err))
    }, [category, sortItem, sort]);

    return (
        <div className="bg-[#fafafa]">
            <div className="max-w-7xl mx-auto lg:px-0 md:px-5 px-3 md:mb-32 mb-20">
                <div className="py-10 flex justify-between flex-wrap items-center md:space-y-0 space-y-7">
                    <h1 className="md:text-5xl text-3xl font-bold md:w-fit w-full">All Available Foods
                        <span className="block border-4 border-lime-500 mt-2 w-[70%]"></span>
                    </h1>

                    <label className="flex flex-col" htmlFor="food-category">
                        <span className="font-semibold">Filter With Category</span>

                        <select onChange={(e) => setCategory(e.target.value)} name="food-category" id="" className="md:py-5 py-2 md:text-base border text-sm rounded-lg px-5 mt-1" required>
                            <option selected disabled>Select Category</option>
                            <option value="Fresh Produce">Fresh Produce</option>
                            <option value="Rice Items">Rice Items</option>
                            <option value="Dairy And Eggs">Dairy & Eggs</option>
                            <option value="Meat And Seafood">Meat & Seafood</option>
                            <option value="Fries And Crispy">Fries & Crispy</option>
                            <option value="Snacks And Sweets">Snacks & Sweets</option>
                            <option value="Others">Others</option>
                        </select>
                    </label>

                    <label className="flex flex-col" htmlFor="food-category">
                        <span className="font-semibold">Sort Item</span>
                        <select onChange={(e) => setSortItem(e.target.value)} name="food-category" id="" className="md:py-5 py-2 md:text-base border text-sm rounded-lg px-5 mt-1" required>
                            <option selected disabled>Select Item</option>
                            <option value="expiredDate">Date Time</option>
                            <option value="foodQuantity">Quantity</option>
                        </select>
                    </label>

                    <label className="flex flex-col" htmlFor="food-category">
                        <span className="font-semibold">Sort Order</span>
                        <select onChange={(e) => setSort(e.target.value)} name="food-category" id="" className="md:py-5 py-2 md:text-base border text-sm rounded-lg px-5 mt-1" required>
                            <option selected disabled>Select Order</option>
                            <option value="asc">Ascending</option>
                            <option value="dsc">Descending</option>
                        </select>
                    </label>
                </div>

                {
                    isLoading ?
                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 md:mt-16 mt-10">
                            {
                                [1, 2, 3, 4].map(item => <div key={item} className="flex w-full mx-auto overflow-hidden bg-white rounded-lg shadow-lg animate-pulse">
                                    <div className="w-1/3 bg-gray-300"></div>

                                    <div className="w-2/3 p-4 md:p-4">
                                        <h1 className="w-40 h-2 bg-gray-200 rounded-lg"></h1>

                                        <p className="w-48 h-2 mt-4 bg-gray-200 rounded-lg"></p>

                                        <div className="flex mt-4 item-center gap-x-2">
                                            <p className="w-5 h-2 bg-gray-200 rounded-lg"></p>
                                            <p className="w-5 h-2 bg-gray-200 rounded-lg"></p>
                                            <p className="w-5 h-2 bg-gray-200 rounded-lg"></p>
                                            <p className="w-5 h-2 bg-gray-200 rounded-lg"></p>
                                            <p className="w-5 h-2 bg-gray-200 rounded-lg"></p>
                                        </div>

                                        <div className="flex justify-between mt-6 item-center">
                                            <h1 className="w-10 h-2 bg-gray-200 rounded-lg"></h1>

                                            <div className="h-4 bg-gray-200 rounded-lg w-28"></div>
                                        </div>
                                    </div>
                                </div>)
                            }
                        </div>
                        : <div>
                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 md:mt-16 mt-10">
                                {
                                    foods.length > 0 ? foods?.map(food => <FoodItem key={food._id} food={food}></FoodItem>) :
                                        <div className="md:col-span-2">
                                            <Lottie
                                                className="md:w-[30%] w-[80%] mx-auto"
                                                options={defaultOptions}
                                                animationData={animationData}
                                                height={200}
                                                width={200}
                                            ></Lottie>
                                            <h2 className="md:text-4xl text-2xl font-bold text-center text-green-500">Product Not Available!</h2>
                                        </div>
                                }
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

export default AvailableFoods;