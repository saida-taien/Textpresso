import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, } from 'swiper/modules';
import pen from './AnimationJSON/pen.json';
import camera from './AnimationJSON/camera.json';
import Lottie from 'lottie-react';
const Banner = () => {
    return (
        <div>
            <Swiper
                loop={true}
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}


                modules={[Autoplay]}
                className="h-[500px]"
            >

                <SwiperSlide>


                    <img src="https://i.ibb.co/Dpw1DVP/scott-graham-OQMZw-Nd3-Th-U-unsplash.jpg" className="w-full " />
                    <div className="absolute   flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                        <div className='text-white space-y-7 pl-20 w-1/2'>
                            <h2 className='text-6xl font-bold text-purple-200 '>Textpresso: Fuel Your Creativity.</h2>
                            <p className='flex justify-center items-center text-xl font-semibold'>Words at Your Fingertips... <div className='w-44'><Lottie loop={true} animationData={pen}></Lottie></div> </p>


                        </div>
                    </div>


                </SwiperSlide>

                <SwiperSlide>


                    <img src="https://i.ibb.co/z26LqX4/jazmin-quaynor-18m-UXUS8ks-I-unsplash.jpg" className="w-full " />
                    <div className="absolute   flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                        <div className='text-white space-y-7 pl-20 w-1/2'>
                            <h2 className='text-6xl font-bold text-purple-200 '>Textpresso: Fuel Your Creativity.</h2>
                            <p className='flex justify-center items-center text-xl font-semibold'>Capture Inspiration with Textpresso... <div className='w-44'><Lottie loop={true} animationData={camera}></Lottie></div> </p>


                        </div>
                    </div>


                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Banner;