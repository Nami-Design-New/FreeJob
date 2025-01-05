import React from "react";

export default function FormButton({ content, ...props }) {
  return (
    <button {...props} className="form_button">
      {content}
    </button>
  );
}
