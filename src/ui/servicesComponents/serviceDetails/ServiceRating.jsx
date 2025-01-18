import useTruncateText from "../../../hooks/useTruncateText";
import UserAvatar from "./UserAvatar";

export default function ServuceRating({ item }) {
  const description = useTruncateText(item.description, 150);

  return (
    <section className="offers_card">
      <div className="row_head" data-aos="fade-up">
        <UserAvatar request={item} /> <p>{description}</p>
      </div>
    </section>
  );
}
