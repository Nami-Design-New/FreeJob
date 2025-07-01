import React from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";

const FormSelector = React.forwardRef(
  ({ options, disabledOption, error, ...props }, ref) => {
    const lang = useSelector((state) => state.language.lang);
    return (
      <div className="form_select">
        {props.label && <label>{props.label}</label>}
        <Form.Select
          ref={ref}
          {...props}
          isInvalid={!!error}
          style={
            lang === "ar"
              ? { backgroundPosition: "left 0.75rem center" }
              : { backgroundPosition: "right 0.75rem center" }
          }
        >
          <option value={""} disabled>
            {disabledOption}
          </option>
          {options?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.name}
            </option>
          ))}
        </Form.Select>
        {error && (
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        )}
      </div>
    );
  }
);
FormSelector.displayName = "FormSelector";

export default FormSelector;
