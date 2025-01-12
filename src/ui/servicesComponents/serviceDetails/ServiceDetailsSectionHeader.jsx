import React from "react";

export default function ServiceDetailsSectionHeader({ children, title }) {
  return (
    <header className="service_details_sections_header">
      {children}
      <h6>{title}</h6>
    </header>
  );
}
