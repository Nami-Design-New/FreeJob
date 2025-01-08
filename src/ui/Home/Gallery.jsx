
import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";
import { useEffect, useState } from "react";
import Masonry from "react-layout-masonry";

const galleryItems = [
  { id: 1, imageUrl: "./images/gallery1.png", alt: "Item 1" },
  { id: 2, imageUrl: "./images/gallery2.png", alt: "Item 2" },
  { id: 3, imageUrl: "./images/gallery7.png", alt: "Item 3" },
  { id: 4, imageUrl: "./images/gallery9.png", alt: "Item 4" },
  { id: 5, imageUrl: "./images/gallery4.png", alt: "Item 5" },
  { id: 6, imageUrl: "./images/gallery5.png", alt: "Item 6" },
  { id: 7, imageUrl: "./images/gallery8.png", alt: "Item 7" },
  { id: 8, imageUrl: "./images/gallery10.jpg", alt: "Item 8" },
  { id: 9, imageUrl: "./images/gallery3.png", alt: "Item 9" },
  { id: 10, imageUrl: "./images/gallery6.png", alt: "Item 10" },
  { id: 11, imageUrl: "./images/gallery12.jpg", alt: "Item 11" },
  { id: 12, imageUrl: "./images/gallery11.jpg", alt: "Item 12" },
];

export default function FramerScrollGallery() {
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...prev, entry.target.dataset.id]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".gallery-item");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="gallery_section">
      <SectionHeader
        title="Some freelance work"
        description="Most viewed and best-selling projects ever"
      />
      <Masonry
        className="mt-5"
        columns={{ 640: 2, 768: 3, 1024: 3, 1280: 5 }}
        gap={16}
      >
        {galleryItems.map((item) => (
          <motion.div
            key={item.id}
            className="gallery-item"
            data-id={item.id}
            initial={{ opacity: 0, y: 50 }}
            animate={
              visibleItems.includes(item.id.toString())
                ? { opacity: 1, y: 0 }
                : {}
            }
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img
              src={item.imageUrl}
              alt={item.alt}
              className="img-fluid rounded"
            />
          </motion.div>
        ))}
      </Masonry>
    </div>
  );
}
