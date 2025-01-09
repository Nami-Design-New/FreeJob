import { Form } from "react-bootstrap";

export default function FormSelector({ options, disabledOption, ...props }) {
  return (
    <div className="form_select">
      {props.label && <label>{props.label}</label>}
      <Form.Select {...props}>
        <option value={""}>{disabledOption}</option>
        {options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.name}
          </option>
        ))}
      </Form.Select>
    </div>
  );
}
