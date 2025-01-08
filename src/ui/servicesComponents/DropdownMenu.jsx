import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();
export default function DropdownMenu({ selectedSkill, onSelect, ...props }) {
  const skills = [
    { value: "Skill 1", label: "Skill 1" },
    { value: "Skill 2", label: "Skill 2" },
    { value: "Skill 3", label: "Skill 3" },
  ];

  return (
    <div className="input-field">
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={skills}
        value={selectedSkill}
        onChange={(selected) => onSelect(selected)}
        placeholder="choose"
        {...props}
      />
    </div>
  );
}
