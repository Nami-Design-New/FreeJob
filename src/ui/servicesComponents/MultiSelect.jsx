import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  return (
    <div className="input-field form_input">
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
        placeholder={t("complaints.choose")}
        {...props}
      />
    </div>
  );
}
