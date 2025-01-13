import FormInput from "../form/FormInput";
import FormButton from "../form/FormButton";
import { useDispatch } from "react-redux";
import { setStep } from "../../redux/slices/authModalSlice";
import { useState } from "react";

export default function EmailLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  function validate(field, value) {
    let error = "";
    if (field === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
      error = "Invalid Email Address.";
    } else if (field === "password" && value.length < 6) {
      error = "Password must be at least 6 characters long.";
    }
    return error;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    const error = validate(name, value);
    setErrors({ ...errors, [name]: error });
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};
    for (const field in formData) {
      const error = validate(field, formData[field]);
      if (error) newErrors[field] = error;
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted successfully!", formData);
      return;
    } else {
      console.log("Form has errors, cannot submit.");
    }
  }

  const dispatch = useDispatch();
  return (
    <div className="left_side">
      <header className="modal_header ">
        <h1>Enter your data to register</h1>
        <p className="d-flex gap-1 align-items-center fs-6">
          Don&apos;t have an account?
          <button
            onClick={() => dispatch(setStep(3))}
            className="btn p-0 text-success"
          >
            Create account now
          </button>
        </p>
      </header>
      <form onSubmit={handleSubmit} className="">
        <FormInput
          name="email"
          label="Email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <p style={{ fontSize: "0.6rem" }} className="my-1  text-danger">
            {errors.email}
          </p>
        )}
        <FormInput
          name="password"
          label="Password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <button type="button" className="forget_pass btn">
          Forget Your Password
        </button>
        <FormButton content="Login" type="submit" />
      </form>
    </div>
  );
}
