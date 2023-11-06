import { useLoaderData } from "react-router-dom";

const SingleFood = () => {

    const foodData = useLoaderData();

    console.log(foodData);

    return (
        <div className="max-w-7xl mx-auto lg:px-0 md:px-5 px-3">
            Hello world
        </div>
    );
};

export default SingleFood;