import StarsRate from "../../StartRate";

export default function OwnerComponent() {
  return (
    <section className="owner_card">
      <img className="user_img" src="https://placehold.co/64" />
      <section className="user_info">
        <h6>Mahmoud Abbas</h6>
        <StarsRate rate={0} />
        <p>
          <span>Register Date</span>
          <span>2024</span>
        </p>
      </section>
    </section>
  );
}
