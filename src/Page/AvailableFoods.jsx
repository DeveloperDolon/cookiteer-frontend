import { useEffect, useState } from "react";


const AvailableFoods = () => {
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("");

    useEffect(() => {
        console.log(category, sort);
    }, [category, sort])

    return (
        <div className="max-w-7xl mx-auto lg:px-0 md:px-5 px-3">
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
                        <option value="Dairy & Eggs">Dairy & Eggs</option>
                        <option value="Meat & Seafood">Meat & Seafood</option>
                        <option value="Fries & Crispy">Fries & Crispy</option>
                        <option value="Snacks & Sweets">Snacks & Sweets</option>
                        <option value="Others">Others</option>
                    </select>
                </label>

                <label className="flex flex-col" htmlFor="food-category">
                    <span className="font-semibold">Sort</span>
                    <select onChange={(e) => setSort(e.target.value)} name="food-category" id="" className="md:py-5 py-2 md:text-base border text-sm rounded-lg px-5 mt-1" required>
                        <option selected disabled>Select Order</option>
                        <option value="dsc">Descending</option>
                        <option value="asc">Ascending</option>
                    </select>
                </label>
            </div>

            <div>

            </div>
        </div>
    );
};

export default AvailableFoods;