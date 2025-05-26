import lentejas from "../../assets/images/lentejas-con-pollo.jpg";
import nuggets from "../../assets/images/nuggets_pollo.jpg";
import ensalada from "../../assets/images/ensalada.jpg";
import comida1 from "../../assets/images/comida1.jpg";
import comida2 from "../../assets/images/comida2.jpg";
import comida3 from "../../assets/images/comida3.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import './StyleCarousel.css'
function CarouselComponent() {
  return (
    <div className="container">
      <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={2}
          spaceBetween={0}
          coverflowEffect={{
            rotate: 0,
            stretch: 60,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper_container"
        >
        <SwiperSlide className="custom-slide">
          <div className="slide-card">
            <img src={ensalada} alt="" />
            <p className="slide-title">Ensalada</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="custom-slide">
          <div className="slide-card">
            <img src={nuggets} alt="" />
            <p className="slide-title">Nuggets</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="custom-slide">
          <div className="slide-card">
            <img src={lentejas} alt="" />
            <p className="slide-title">Lentejas con pollo</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="custom-slide">
          <div className="slide-card">
            <img src={comida3} alt="" />
            <p className="slide-title">Pasta</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="custom-slide">
          <div className="slide-card">
            <img src={comida1} alt="" />
            <p className="slide-title">Tortilla</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="custom-slide">
          <div className="slide-card">
            <img src={comida2} alt="" />
            <p className="slide-title">Brocoli con pollo</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="custom-slide">
          <div className="slide-card">
            <img src={comida2} alt="" />
            <p className="slide-title">Brocoli con pollo</p>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="slider-controler">
        <div className="arrows-container">
          <div className="swiper-button-prev slide-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slide-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarouselComponent;
