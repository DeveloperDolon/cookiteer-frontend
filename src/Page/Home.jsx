import { useEffect, useState } from "react";
import Banner from "../Component/Banner/Banner";
import { axiosSecure } from "../hooks/useExiosSecure";
import { Link } from "react-router-dom";
import FoodItem from "../Component/FoodItem/FoodItem";
import AboutUs from "../Component/About/AboutUs";
import Team from "./Team";
import Testimonials from "./Testimonials";


const Home = () => {
    const [foods, setFoods] = useState([]);
    const [seeMoreFoods, setSeeMoreFoods] = useState(false);

    useEffect(() => {
        axiosSecure.get("/api/v1/foods?sortItem=foodQuantity&sort=dsc")
            .then(res => {
                if(res.data.length > 6) {
                    const foodsArr = res.data.slice(0, 6);
                    setFoods(foodsArr);
                    setSeeMoreFoods(true);
                    return;
                } 
                setFoods(res.data);
                setSeeMoreFoods(false);
            })
            .catch(err => console.log(err.message))
    }, []);

    return (
        <div className="bg-[#fafafa]">
            <Banner></Banner>


            <div className="bg-[#fafafa]">
                <div className="max-w-7xl mx-auto lg:px-0 md:px-5 px-3 md:py-32 py-24">
                    <h1 className="md:text-7xl text-4xl font-extrabold title-text text-center">Featured Foods</h1>
                    <p className="text-center lg:w-[70%] md:w-[80%] w-full mx-auto my-5 md:text-base text-sm md:leading-7 leading-relaxed">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti corrupti accusantium quae error id fugiat nulla architecto alias. Sapiente sequi ab doloremque eligendi officiis, obcaecati unde aliquam mollitia explicabo cumque.
                    </p>

                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 md:mt-16 mt-10">
                        {
                            foods?.map(food => <FoodItem key={food._id} food={food}></FoodItem>)
                        }
                    </div>

                    <div className="text-center mt-16">
                        {
                            seeMoreFoods ? <Link to="/available-foods" className="mx-auto btn bg-white drop-shadow-xl">Show All</Link> : ""
                        }
                    </div>
                </div>
            </div>

            <div>
                <AboutUs></AboutUs>
            </div>

            <div className="max-w-7xl mx-auto">
                <Team></Team>
            </div>

            <div>
                <Testimonials></Testimonials>
            </div>
        </div>
    );
};

export default Home;