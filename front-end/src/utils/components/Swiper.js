import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { host } from "../../static/API";
import { Swiper as Slider, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
export default function Swiper() {
  return (
    <Slider
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      loop={true}
    >
      <SwiperSlide className="h-[380px]">
        <img
          className="object-cover w-100"
          src={`http://${host}:8000/resources/images/mooncake-banner.jpg`}
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide className="h-[380px]">
        <img
          className="object-cover w-100"
          src={`http://${host}:8000/resources/images/veg-banner.jpg`}
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide className="h-[380px]">
        <img
          className="object-cover w-100"
          src={`http://${host}:8000/resources/images/banner-traicay.jpg`}
          alt=""
        />
      </SwiperSlide>
    </Slider>
  );
}
