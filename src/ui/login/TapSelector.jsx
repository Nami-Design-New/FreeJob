import TapButton from "./TapButton";

export default function TabSelector({ title1, title2, selected, onSelect }) {
  return (
    <div className="tab_selector">
      <TapButton
        type="button"
        selected={selected}
        onClick={() => onSelect(title1)}
        title={title1}
      />
      <TapButton
        type="button"
        selected={selected}
        onClick={() => onSelect(title2)}
        title={title2}
      />
    </div>
  );
}
