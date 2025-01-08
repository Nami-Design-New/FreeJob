import React from "react";

export default function SectionHeader({ title, description }) {
  return (
    <header className="section_header">
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}
