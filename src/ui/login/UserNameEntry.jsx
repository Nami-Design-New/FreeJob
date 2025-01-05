import React from "react";
import FormInput from "../form/FormInput";
import { useDispatch } from "react-redux";
import { setStep } from "../../redux/slices/authModalSlice";
import FormButton from "../form/FormButton";

export default function UserNameEntry() {
  const dispatch = useDispatch();
  return (
    <div className="left_side">
      <header className="modal_header ">
        <h1>Enter your data to register</h1>
        <p className="">
          Add a unique username that will make you stand out to others. You
          can&apos;t change your username, so choose wisely.
        </p>
      </header>
      <form>
        <FormInput type="email" label="Email" />
        <button
          onClick={() => dispatch(setStep(2))}
          className="forget_pass btn"
        >
          Are you already registered?
        </button>{" "}
        <FormButton
          content="Next"
          type="button"
          onClick={() => dispatch(setStep(4))}
        />
      </form>
    </div>
  );
}
