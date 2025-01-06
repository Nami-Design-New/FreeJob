import React from "react";
import FormButton from "../form/FormButton";

export default function Banner() {
  return (
    <>
      <div className="banner">
        <h1>Join now and become FreeLancer with FREEJOB</h1>
        <FormButton
          content="Join Now"
          style={{
            color: "black",
            backgroundColor: "white",
            width: "fit-content",
            marginTop: "0",
            padding: "0.5rem 0.8rem",
            fontSize: "0.75rem",
          }}
        />
      </div>
      <div className="bottom_section"></div>
    </>
  );
}
