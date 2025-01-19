import useTruncateText from "../../../hooks/helpers/useTruncateText";
import UserAvatar from "./UserAvatar";

export default function ServiceRating({ item }) {
  const description = useTruncateText(item.description, 150);

  return (
    <section className="offers_card">
      <div className="row_head" data-aos="fade-up">
        <UserAvatar request={item} /> <p>{description}</p>
      </div>
    </section>
  );
}
