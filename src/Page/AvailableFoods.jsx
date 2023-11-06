
import { useEffect, useState } from "react";
import { axiosSecure } from "../hooks/useExiosSecure";
import FoodItem from "../Component/FoodItem/FoodItem";

const AvailableFoods = () => {
    const [category, setCategory] = useState("");
    const [sortItem, setSortItem] = useState("");
    const [foods, setFoods] = useState([]);
    const [sort, setSort] = useState("");

    useEffect(() => {
        axiosSecure.get(`/api/v1/foods?sortItem=${sortItem}&sort=${sort}&category=${category}`)
        .then(res => setFoods(res.data))
        .catch(err => console.log(err))
    }, [category, sortItem, sort]);

    return (
        <div className="max-w-7xl mx-auto lg:px-0 md:px-5 px-3 md:mb-32 mb-20">
            <div className="my-10 flex justify-between flex-wrap items-center md:space-y-0 space-y-7">
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

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 md:mt-16 mt-10">
                {
                    foods?.map(food => <FoodItem key={food._id} food={food}></FoodItem>)
                }
            </div>
        </div>
    );
};

export default AvailableFoods;