import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { axiosSecure } from "../hooks/useExiosSecure";
import toast from "react-hot-toast";
import moment from "moment/moment";


const AddFood = () => {

    const {user, defaultImage} = useContext(AuthContext);

    const handleAddProduct = (e) => {
        const addProductId = toast.loading("Product adding...");
        e.preventDefault();

        const form = e.target;
        const foodName = form.foodName.value;
        const foodImage = form.foodImage.value;
        const foodQuantity = form.foodQuantity.value;
        const date = form.expiredDate.value;
        const pickUpLocation = form.pickUpLocation.value;
        const category = form.category.value;
        const additionalNotes = form.additionalNotes.value;
        const donarName = user.displayName;
        const donarEmail = user.email;
        const donarPhoto = user?.photoURL ? user?.photoURL : defaultImage;
        const expiredDate = moment(date).format("lll");

        const foodInfo = {foodName, foodImage, foodQuantity, expiredDate, pickUpLocation, category, additionalNotes, donarName, donarEmail, donarPhoto};


        axiosSecure.post("/api/v1/add-food", {...foodInfo})
        .then(res => {
            if(res.data.insertedId) {
                toast.success("Product added successfully!!", { id: addProductId });
            }
        }).catch(err => {
            console.log(err);
            toast.error(err.message, {id: addProductId});
        })
    }

    return (
        <div className="max-w-7xl mx-auto lg:px-0 md:px-5 px-3">
            <div
                style={{
                    background: "url('https://images.pexels.com/photos/4871119/pexels-photo-4871119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1') no-repeat center",
                    backgroundSize: "cover"
                }}
                className="md:text-5xl text-3xl w-full font-bold py-28 text-center overflow-hidden relative rounded-xl border-8 border-lime-400">
                <span className="overlayz z-0"></span>
                <h1 className="z-40 relative text-white">Add Food</h1>

                <p className="text-base text-white z-30 relative py-5 font-medium">
                    We believe that every morsel matters and that food is best when shared. <br /> Your kitchen surplus could be a hearty meal for a neighbor.
                </p>
            </div>

            <div className="mt-10 mb-24">
                <form onSubmit={handleAddProduct} className="grid md:grid-cols-2 grid-cols-1 gap-7">
                    <div className="grid grid-cols-1 gap-5">
                        <label htmlFor="foodName"> Food Name
                            <input type="text" name="foodName" className="w-full md:py-5 py-2 md:text-base border text-sm mt-3 rounded-lg px-5" placeholder="Food Name" required />
                        </label>

                        <label htmlFor="foodImage"> Food Image
                            <input type="text" name="foodImage" className="w-full md:py-5 py-2 md:text-base border text-sm mt-3 rounded-lg px-5" placeholder="Food Image" required />
                        </label>

                        <label htmlFor="foodQuantity"> Food Quantity(no. of person to be served)
                            <input type="number" name="foodQuantity" className="w-full md:py-5 py-2 md:text-base border text-sm mt-3 rounded-lg px-5" placeholder="Food Quantity" min="1" max="100" required />
                        </label>

                        <label htmlFor="expiredDate"> Expired Date/Time
                            <input type="datetime-local" name="expiredDate" className="w-full md:py-5 py-2 md:text-base border text-sm mt-3 rounded-lg px-5" placeholder="Expired Date" required />
                        </label>
                        
                        <label htmlFor="pickUpLocation"> Pickup Location
                            <input type="text" name="pickUpLocation" className="w-full md:py-5 py-2 md:text-base border text-sm mt-3 rounded-lg px-5" placeholder="Pickup Location" required />
                        </label>
                    </div>

                    <div className="grid grid-cols-1 gap-5">
                        <label htmlFor="category"> Category
                            <select name="category" id="" className="w-full md:py-5 py-2 md:text-base border text-sm rounded-lg px-5 mt-3" required>
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

                        <label htmlFor="additionalNotes"> Additional Notes
                            <textarea name="additionalNotes" className="w-full md:py-5 py-2 md:text-base border text-sm mt-3 rounded-lg px-5" id="" placeholder="Additional Notes" required cols="30" rows="10"></textarea>
                        </label>

                        <input type="submit" className="w-full block py-5 md:text-lg text-base font-bold bg-lime-500 text-white rounded-lg cursor-pointer" value="Submit Food" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddFood;