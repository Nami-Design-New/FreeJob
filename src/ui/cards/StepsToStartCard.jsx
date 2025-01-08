import React from "react";

export default function StepsToStartCard({ step }) {
  const { title, description, imageUrl } = step;
  return (
    <div className="stepsToStart_card">
      <div className="image_container">
        <img src={imageUrl} />
      </div>
      <div className="content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
