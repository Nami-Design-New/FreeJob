import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

export default function FormSelector({ options, disabledOption, ...props }) {
  const lang = useSelector((state) => state.language.lang);
  return (
    <div className="form_select  ">
      {props.label && <label>{props.label}</label>}
      <Form.Select
        {...props}
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
    </div>
  );
}
