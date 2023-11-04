import "./style.css"
import bannerVideo from "../../assets/images/Intro FOOD GOOD.mp4";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const Banner = () => {
    return (
        <>
            <div className="h-[calc(100vh-82px)] overflow-y-hidden relative flex justify-center items-center">
                <video src={bannerVideo} width="100%" className="absolute z-0" height="100%" autoPlay loop muted>
                </video>
                <span className="overlay text-white"></span>


                <div className="z-50 absolute w-full overflow-x-hidden">
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <div className="mb-10">
                                <h1 className="title-text text-white md:text-7xl font-bold text-5xl"><span className="text-green-500 title-text">Nourishing connections</span> <br />One plate at a time.</h1>
                                <p className="text-white md:my-8 my-5 md:text-base text-sm">Food is the universal language that brings us together. <br /> Share a meal, share a moment, and share the love</p>
                                <div>
                                    <button className="btn bg-green-500 text-white border-none">View All Foods</button>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="mb-10">
                                <h1 className="title-text text-white md:text-7xl font-bold text-5xl"><span className="text-green-500 title-text">Sharing not only food </span> <br />but the joy of giving.</h1>
                                <p className="text-white md:my-8 my-5 md:text-base text-sm">Food is the universal language that brings us together. <br /> Share a meal, share a moment, and share the love</p>
                                <div>
                                    <button className="btn bg-green-500 text-white border-none">View All Foods</button>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="mb-10">
                                <h1 className="title-text text-white md:text-7xl font-bold text-5xl"><span className="text-green-500 title-text">Passionately prepared, </span> <br />generously shared.</h1>
                                <p className="text-white md:my-8 my-5 md:text-base text-sm">Food is the universal language that brings us together. <br /> Share a meal, share a moment, and share the love</p>
                                <div>
                                    <button className="btn bg-green-500 text-white border-none">View All Foods</button>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="mb-10">
                                <h1 className="title-text text-white md:text-7xl font-bold text-5xl"><span className="text-green-500 title-text">Savor the moments,</span> <br />share the flavors.</h1>
                                <p className="text-white md:my-8 my-5 md:text-base text-sm">Food is the universal language that brings us together. <br /> Share a meal, share a moment, and share the love</p>
                                <div>
                                    <button className="btn bg-green-500 text-white border-none">View All Foods</button>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div >
            </div>
        </>

    )
};

export default Banner;