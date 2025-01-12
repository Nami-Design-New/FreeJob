import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

const MultiSelect = ({
  label,
  options,
  selectedOptions,
  handleChange,
  ...props
}) => {
  return (
    <div className="input_field">
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
};

export default MultiSelect;
