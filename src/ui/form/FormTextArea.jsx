export default function FormTextArea({ label, ...props }) {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={props.id} className="form-label">
          {label}
        </label>
      )}
      <textarea className="form_textarea" {...props} />
    </div>
  );
}
