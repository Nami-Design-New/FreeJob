export default function CategoryCard({ imageUrl, title }) {
  return (
    <section className="category_card">
      <section className="image_container">
        <img src={imageUrl || "https://placehold.co/80"} />
      </section>
      <h3 className="category_card_title ">
        {title || "E-commerce Website Development"}
      </h3>
    </section>
  );
}
