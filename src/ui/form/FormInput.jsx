import React from "react";
import { Form } from "react-bootstrap";

const FormInput = React.forwardRef(
  ({ className, error, label, ...props }, ref) => {
    return (
      <section className={`${className || ""} form_input d-flex flex-column`}>
        {label && (
          <label className="fs-6" htmlFor={props.id}>
            {label}
          </label>
        )}

        <Form.Control
          className="form-control"
          isInvalid={!!error}
          ref={ref}
          {...props}
        />

        {error && (
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        )}
      </section>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
