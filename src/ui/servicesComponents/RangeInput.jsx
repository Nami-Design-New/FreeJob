import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function RangeInput({ label, value, min, max, onChange }) {
  const handleChange = (val) => {
    onChange(val);
  };
  return (
    <div className="px-3">
      <Slider
        range
        min={min}
        max={max}
        allowCross={false}
        value={value}
        reverse
        step={1}
        onChange={handleChange}
        trackStyle={[{ backgroundColor: "#003912", opacity: 1 }]}
        railStyle={{ backgroundColor: "#d3d3d3" }}
        handleStyle={[
          {
            borderColor: "#003912",
            backgroundColor: "#003912",
            opacity: 1,
            boxShadow: "none",
          },
          {
            borderColor: "#003912",
            backgroundColor: "#003912",
            opacity: 1,
            boxShadow: "none",
          },
        ]}
      />
      <p>
        <span>{value[0]}</span> to <span>{value[1]}</span> {label}
      </p>
    </div>
  );
}
