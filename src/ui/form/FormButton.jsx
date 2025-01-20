export default function FormButton({
  children,
  className,
  loading,
  content,
  ...props
}) {
  return (
    <button
      {...props}
      className={`${className} form_button`}
      style={{ opacity: loading ? 0.7 : 1 }}
      disabled={loading}
      type="submit"
    >
      {content}
      {children}{" "}
      <i className={loading ? "fa-solid fa-spinner fa-pulse fa-spin" : ""} />
    </button>
  );
}
