import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { CardMore } from "./CardMore";

export function CardSlider({
  cards,
  showMore,
  onMoreClick,
  spaceBetween = 45,
  slidesPerView = 2,
}: {
  cards: React.ReactNode[];
  showMore?: boolean;
  onMoreClick?: () => void;
  spaceBetween?: number;
  slidesPerView?: number;
}) {
  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      grabCursor={true}
    >
      {cards.map((card, i) => (
        <SwiperSlide key={i}>{card}</SwiperSlide>
      ))}

      {showMore && (
        <SwiperSlide>
          <CardMore onClick={onMoreClick!} />
        </SwiperSlide>
      )}
    </Swiper>
  );
}
