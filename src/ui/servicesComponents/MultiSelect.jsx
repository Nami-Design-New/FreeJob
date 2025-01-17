import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();
export default function MultiSelect({
  label,
  options,
  selectedOptions,
  handleChange,
  ...props
}) {
  return (
    <div className="input-field">
      <label className="mb-2" htmlFor={props.id}>
        {label}
      </label>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        placeholder="choose"
        {...props}
      />
    </div>
  );
}
