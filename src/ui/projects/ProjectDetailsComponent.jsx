import { useState } from "react";
import { LiaFileSolid } from "react-icons/lia";
import { useNavigate } from "react-router";
export default function ServiseDetailsComponent() {
  let islogged = true;
  const navigate = useNavigate();

  return (
    <section className="project_details_component">
      <section className="project_description">
        <h6>
          <LiaFileSolid />
          Project details
        </h6>
        <p>
          The user in the application work and the price is agreed upon with the
          client - Technical support and customer satisfaction are always the
          basis - Speed ​​of response and completion of the work in the best
          possible way - My work gallery on Mostaqil:
        </p>
      </section>
      <section>
        {}
      </section>

      <section></section>
    </section>
  );
}
