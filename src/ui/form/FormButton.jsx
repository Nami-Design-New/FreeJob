import React from "react";

export default function FormButton({ className, content, ...props }) {
  return (
    <button {...props} className={`${className} form_button`}>
      {content}
    </button>
  );
}
