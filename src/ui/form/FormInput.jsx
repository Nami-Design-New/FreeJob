import React from "react";

export default function FormInput({ label, ...props }) {
  return (
    <div className="form_input d-flex flex-column ">
      <label className="fs-6" htmlFor={label}>
        {label}
      </label>
      <input className="form-control " id={label} {...props} />
    </div>
  );
}
