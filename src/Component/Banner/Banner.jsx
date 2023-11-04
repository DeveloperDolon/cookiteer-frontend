import "./style.css"
import bannerVideo from "../../assets/images/Intro FOOD GOOD.mp4";

const Banner = () => {
    return (
        <>
            <div className="md:h-[calc(100vh-82px)] overflow-hidden relative flex justify-center items-center">
                <video src={bannerVideo} width="100%" className="absolute z-0" height="100%" autoPlay loop muted>
                </video>
                <span className="overlay text-white"></span>
            </div>

            <div className="z-50">
               
            </div>
        </>

    )
};

export default Banner;