import React from "react";
import { Breadcrumb } from "react-bootstrap";

export default function DetailsHeader({ links }) {
  return (
    <section className="service_details_header">
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        {links.map((link, index) => (
          <Breadcrumb.Item key={index} href={`/${link}`}>
            {link}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </section>
  );
}
