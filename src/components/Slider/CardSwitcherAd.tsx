import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";

interface CardSwitcherProps {
  items?: React.ReactNode[]; // <- теперь может быть undefined
  autoplay?: boolean;
  delay?: number;
}

export function CardSwitcher({
  items = [], // <- даём значение по умолчанию
  autoplay = true,
  delay = 3000,
}: CardSwitcherProps) {
  if (items.length === 0) {
    return null; // можно поставить заглушку, если хочешь
  }

  return (
    <Swiper
      slidesPerView={1}
      loop
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      autoplay={autoplay ? { delay, disableOnInteraction: false } : false}
      modules={[Pagination, Autoplay]}
      style={{ width: "100%", height: "50%" }}
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>{item}</SwiperSlide>
      ))}
    </Swiper>
  );
}
