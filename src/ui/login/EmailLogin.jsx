import React from "react";
import FormInput from "../form/FormInput";
import FormButton from "../form/FormButton";
import { useDispatch } from "react-redux";
import { setStep } from "../../redux/slices/authModalSlice";

export default function EmailLogin() {
  const dispatch = useDispatch();
  return (
    <div className="left_side">
      <header className="modal_header ">
        <h1>Enter your data to register</h1>
        <p className="d-flex gap-1 align-items-center fs-6">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => dispatch(setStep(3))}
            className="btn p-0 text-success"
          >
            Create account now
          </button>{" "}
        </p>
      </header>
      <form className="">
        <FormInput label="Email" type="email" />
        <FormInput label="Password" type="password" />
        <button type="button" className="forget_pass btn">
          Forget Your Password
        </button>
        <FormButton content="Login" type="submit" />
      </form>
    </div>
  );
}
