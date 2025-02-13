export default function FormInput({ className, label, ...props }) {
  return (
    <section
      className={`${className ? className : ""}  form_input d-flex flex-column`}
    >
      <label className="fs-6" htmlFor={label}>
        {label}
      </label>
      <input className="form-control " id={label} {...props} />
    </section>
  );
}
