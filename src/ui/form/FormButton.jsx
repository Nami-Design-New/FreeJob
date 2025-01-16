import React from "react";

export default function FormButton({ children, className, content, ...props }) {
  return (
    <button {...props} className={`${className} form_button`}        >
      {content}
      {children}
    </button>
  );
}
