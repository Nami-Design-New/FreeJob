import { Form } from "react-bootstrap";

export default function FormSelector({ options, disabledOption = "Please select", ...props }) {
  return (
    <div className="form_select">
      {props.label && <label>{props.label}</label>}
      <Form.Select {...props}>
        <option value="">{disabledOption}</option>
        {options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </div>
  );
}