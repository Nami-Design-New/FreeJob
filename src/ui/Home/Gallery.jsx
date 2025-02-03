import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";
import { useEffect, useState, useRef } from "react";
import Masonry from "react-layout-masonry";
import { useTranslation } from "react-i18next";
import { useGetMostOrder } from "../../hooks/services/useGetMostOrder";
import { Link } from "react-router-dom";
import DataLoader from "../DataLoader";

export default function FramerScrollGallery() {
  const { t } = useTranslation();
  const [visibleItems, setVisibleItems] = useState([]);
  const observerRef = useRef(null);
  const { isLoading, data: galleryItems } = useGetMostOrder();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        setVisibleItems((prev) => {
          const newVisibleItems = new Set(prev);
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              newVisibleItems.add(entry.target.dataset.id);
            }
          });
          return [...newVisibleItems];
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll(".gallery-item");
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      elements.forEach((el) => observerRef.current.unobserve(el));
      observerRef.current.disconnect();
    };
  }, [galleryItems]); // Ensure the effect runs when data is loaded

  return (
    <div className="gallery_section">
      <SectionHeader
        title={t("home.freelancework")}
        description={t("home.freelanceworkSubTitle")}
      />
      {isLoading ? (
        <DataLoader />
      ) : (
        <Masonry
          className="mt-5"
          columns={{ 640: 2, 768: 3, 1024: 3, 1280: 5 }}
          gap={16}
        >
          {galleryItems?.data?.map((item) => (
            <motion.div
              key={item.id}
              className="gallery-item"
              data-id={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={
                visibleItems.includes(item.id.toString())
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 50 }
              }
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Link
                to={`/services/${item.id}/${encodeURIComponent(item.title)}`}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="rounded"
                  style={{ width: "100%", objectFit: "cover" }}
                />
              </Link>
            </motion.div>
          ))}
        </Masonry>
      )}
    </div>
  );
}
