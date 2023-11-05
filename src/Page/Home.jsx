import { useEffect, useState } from "react";
import Banner from "../Component/Banner/Banner";
import { axiosSecure } from "../hooks/useExiosSecure";


const Home = () => {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        axiosSecure.get("/api/v1/foods")
        .then(res => setFoods(res.data))
        .catch(err => console.log(err.message))
    }, []);

    return (
        <div>
            <Banner></Banner>

            <div className="max-w-7xl mx-auto lg:px-0 md:px-5 px-3 md:my-32 my-24">
                <h1 className="md:text-7xl text-4xl font-extrabold title-text text-center">Featured Foods</h1>
                <p className="text-center my-5 md:text-base text-sm md:leading-7 leading-relaxed">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti corrupti accusantium quae error id fugiat nulla architecto alias. Sapiente sequi ab doloremque eligendi officiis, obcaecati unde aliquam mollitia explicabo cumque.
                </p>

                <div>
                    {
                        foods?.map(food => <div key={food._id}>
                            
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;