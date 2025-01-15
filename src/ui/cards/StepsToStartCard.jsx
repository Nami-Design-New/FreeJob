import { useTranslation } from "react-i18next";

export default function StepsToStartCard({ step }) {
  const { title, description, imageUrl } = step;
  const { t } = useTranslation();
  return (
    <section className="stepsToStart_card">
      <section className="image_container">
        <img src={imageUrl} />
      </section>
      <section className="content">
        <h3>{t(title)}</h3>
        <p>{t(description)}</p>
      </section>
    </section>
  );
}
