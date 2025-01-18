export default function CategoryCard({ category }) {
  return (
    <section className="category_card">
      <section className="image_container">
        <img src={category.image || "https://placehold.co/80"} />
      </section>
      <h3 className="category_card_title ">
        {category.name || "E-commerce Website Development"}
      </h3>
    </section>
  );
}
