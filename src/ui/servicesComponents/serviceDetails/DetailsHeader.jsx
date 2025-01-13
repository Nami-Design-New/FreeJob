import React from "react";
import { Breadcrumb } from "react-bootstrap";

export default function DetailsHeader({ links }) {
  console.log(typeof links !== "string");

  return (
    <section className="service_details_header">
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        {typeof links !== "string" ? (
          links.map((link, index) => (
            <Breadcrumb.Item key={index} href={`/${link}`}>
              {link}
            </Breadcrumb.Item>
          ))
        ) : (
          <Breadcrumb.Item href={`/${links.split(" ").join("-")}`}>
            {links}
          </Breadcrumb.Item>
        )}
      </Breadcrumb>
    </section>
  );
}
