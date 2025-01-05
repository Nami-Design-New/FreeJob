function TapButton({ title, selected, ...props }) {
  return (
    <button
      className={`tap_button ${title === selected ? "tap-bg text-white" : ""}`}
      {...props}
    >
      {title}
    </button>
  );
}

export default TapButton;
