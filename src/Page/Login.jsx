
import { useRef, useState } from "react";
import "./style.css"
import { Link } from "react-router-dom";

const Login = () => {

    const [passValidMsg, setPassValidMsg] = useState("Password need to include length 8, Special Character, Capital Letter, Number!");
    const [isValid, setIsValid] = useState(false);
    const verifyRef = useRef();

    const handleValidPassword = (e) => {
        setIsValid(false);
        const capitalLetterRegEx = /[A-Z]/;
        let count = 0;
        const numberRegex = /\d/;
        // eslint-disable-next-line no-useless-escape
        const specialCharacter = /[\!\@\#\$\%\^\&\*\(\)\-\+\[\]\{\}\;\:\'\"\,\<\>\.\?\/\\\|\~\`]/;
        const validWords = ["8 Character", "Capital Letter", "Number", "Special Character"];

        const password = e.target.value;
        const verifyElements = verifyRef.current.childNodes;

        if (password.length > 8) {
            verifyElements[0].classList.remove("hidden");
            validWords[0] = "";
            count++;
        } else {
            verifyElements[0].classList.add("hidden");
            validWords[0] = "8 Character";
        }

        if (capitalLetterRegEx.test(password)) {
            verifyElements[1].classList.remove("hidden");
            validWords[1] = "";
            count++;
        } else {
            verifyElements[1].classList.add("hidden");
            validWords[1] = "Capital Letter";
        }

        if (numberRegex.test(password)) {
            verifyElements[2].classList.remove("hidden");
            validWords[2] = "";
            count++;
        } else {
            verifyElements[2].classList.add("hidden");
            validWords[2] = "Number";
        }

        if (specialCharacter.test(password)) {
            verifyElements[3].classList.remove("hidden");
            validWords[3] = "";
            count++;
        } else {
            verifyElements[3].classList.add("hidden");
            validWords[3] = "Special Character";
        }

        setPassValidMsg(`Password need to include ${validWords[0]}, ${validWords[1]}, ${validWords[2]}, ${validWords[3]}`);

        if (count > 2 && password.length >= 8) {
            setPassValidMsg("Your password is valid!");
            setIsValid(true)
        }
    }

    return (
        <div className="login-container h-screen flex justify-center items-center px-3 py-5">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl glass">
                <form className="card-body">
                    <h1 className="text-center md:text-4xl font-bold text-2xl">Log in</h1>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-3">


                        <div className=" relative ">
                            <label htmlFor="with-indications" className="text-gray-700">
                                Password
                                <span className="text-red-500 required-dot">
                                    *
                                </span>
                            </label>
                            <input onChange={handleValidPassword} type="password" id="with-indications" className="mt-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="password" placeholder="Password" required />
                            <div ref={verifyRef} className="grid w-full h-1 grid-cols-12 gap-4 mt-3">
                                <div className="h-full col-span-3 hidden bg-green-500 rounded">
                                </div>
                                <div className="h-full col-span-3 hidden bg-green-500 rounded">
                                </div>
                                <div className="h-full col-span-3 hidden bg-green-500 rounded">
                                </div>
                                <div className="h-full col-span-3 hidden bg-green-500 rounded dark:bg-dark-1">
                                </div>
                            </div>
                            <div className="mt-2 text-green-500">
                                <p className={`${isValid ? "text-green-500" : "text-red-500"} md:text-sm text-xs font-medium`}>
                                    {passValidMsg}
                                </p>
                            </div>
                        </div>

                        <div className="">
                            <label className="label pl-0">
                                <a className="label-text-alt link link-hover pl-0">Forgot password?</a>
                            </label>

                            <p className="md:text-sm text-xs w-fit">
                                Do not have any account? <Link to="/register" className="font-bold hover:underline text-sky-600">Register</Link>
                            </p>
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;


