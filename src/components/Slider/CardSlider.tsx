import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { CardMore } from "./CardMore";

export function CardSlider({
  cards,
  showMore,
  onMoreClick,
}: {
  cards: React.ReactNode[];
  showMore?: boolean;
  onMoreClick?: () => void;
}) {
  return (
    <Swiper slidesPerView={2.2} spaceBetween={20} grabCursor={true}>
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
