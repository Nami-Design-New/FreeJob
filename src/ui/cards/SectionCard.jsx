export default function SectionCard({ id, title, backgroundColor, imageUrl }) {
  return (
    // <Link to={`/section/${id}`} className="">
    <section
      className="sections_card"
      style={{
        backgroundColor: backgroundColor ? backgroundColor : "#00732E",
      }}
    >
      <h3 className="section_card_title">{title || "Website Development"}</h3>
      <section className="image_container">
        <img src={imageUrl || "https://placehold.co/188"} alt="section1" />
      </section>
    </section>
    // </Link>
  );
}
