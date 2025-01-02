export default function SectionCard({ title, backgroundColor, imageUrl }) {
  return (
    <section
      className="sections_card"
      style={{ backgroundColor: backgroundColor ? backgroundColor : "#00732E" }}
    >
      <h3 className="section_card_title">{title || "Website Development"}</h3>
      <div className="image_container">
        <img src={imageUrl || "https://placehold.co/188"} alt="section1" />
      </div>
    </section>
  );
}