export default function SectionCard({ section }) {
  return (
    <section
      className="sections_card"
      style={{
        backgroundColor: section?.color || "#00732E",
      }}
    >
      <h3 className="section_card_title">{section.name}</h3>
      <section className="image_container">
        <img src={section.image} alt={section.name} />
      </section>
    </section>
  );
}
