import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SectionCard from "../cards/SectionCard";
import ShowAll from "../ShowAll";
const sections = [
  {
    id: "1",
    title: "Website Development",
    backgroundColor: "#00732E",
    imageUrl: "https://placehold.co/188",
  },
  {
    id: "2",
    title: "Logo Design",
    backgroundColor: "#FF7640",
    imageUrl: "https://placehold.co/188",
  },
  {
    id: "3",
    title: "SEO",
    backgroundColor: "#003912",
    imageUrl: "https://placehold.co/188",
  },
  {
    id: "4",
    title: "Architecture & Interior Design",
    backgroundColor: "#4D1727",
    imageUrl: "https://placehold.co/188",
  },
  {
    id: "5",
    title: "Social Media Marketing",
    backgroundColor: "#687200",
    imageUrl: "https://placehold.co/188",
  },
  {
    id: "6",
    title: "Voice Over",
    backgroundColor: "#421300",
    imageUrl: "https://placehold.co/188",
  },
  {
    id: "7",
    title: "Logo Design",
    backgroundColor: "#FF7640",
    imageUrl: "https://placehold.co/188",
  },
  {
    id: "8",
    title: "Logo Design",
    backgroundColor: "#421300",
    imageUrl: "https://placehold.co/188",
  },
  {
    id: "9",
    title: "Logo Design",
    backgroundColor: "#FF7640",
    imageUrl: "https://placehold.co/188",
  },
];

export default function SectionsSwiper() {
  return (
    <>
      <div className="px-3">
        <ShowAll sectionName="Sections" to="/sections" />
      </div>
      <Swiper
        spaceBetween={16}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          425: {
            slidesPerView: 2,
          },
          575: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          992: {
            slidesPerView: 5,
          },
          1200: {
            slidesPerView: 6,
          },
        }}
      >
        {sections.map((item) => (
          <SwiperSlide key={item.id} style={{ height: "300px" }}>
            <SectionCard
              backgroundColor={item.backgroundColor}
              title={item.title}
              imageUrl={item.imageUrl}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
