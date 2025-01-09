import React from "react";

export default function StepsToStartCard({ step }) {
  const { title, description, imageUrl } = step;
  return (
    <section className="stepsToStart_card">
      <section className="image_container">
        <img src={imageUrl} />
      </section>
      <section className="content">
        <h3>{title}</h3>
        <p>{description}</p>
      </section>
    </section>
  );
}
