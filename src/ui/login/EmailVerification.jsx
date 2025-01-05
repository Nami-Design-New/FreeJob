import { useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch } from "react-redux";
import { setStep } from "../../redux/slices/authModalSlice";
import FormButton from "../form/FormButton";
import BackButton from "./BackButton";

export default function EmailVerification() {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [isDisabled, setIsDisabled] = useState(true);

  //   useEffect(() => {
  //     if (timer > 0) {
  //       const interval = setInterval(() => {
  //         setTimer((prev) => prev - 1);
  //       }, 1000);
  //       return () => clearInterval(interval);
  //     } else {
  //       setIsDisabled(false);
  //     }
  //   }, []);
  const handleResend = () => {
    setTimer(30);
    setIsDisabled(true);
  };

  return (
    <div className="left_side pt-4">
      <BackButton />
      <header className="modal_header pb-3 ">
        <h1>Confirm your email</h1>
        <p className="">
          Enter the verification code we emailed to:nemamirror1@gmail.com.{" "}
          <button
            onClick={() => dispatch(setStep(3))}
            className="btn p-0 text-success"
          >
            (Use a different email)
          </button>
        </p>
      </header>
      <div>
        <label className="mb-2 fw-semibold" htmlFor="">
          Enter The Code
        </label>
        <OTPInput
          containerStyle={{
            gap: "0.5rem",
            marginTop: "0.2rem",
            marginBottom: "2.5rem",
          }}
          value={otp}
          onChange={setOtp}
          numInputs={5}
          inputType="number"
          inputStyle={{
            border: "none",
            backgroundColor: "#E8FAF4",
            justifyContent: "center",
            width: "100%",
            height: "50px",
            borderRadius: "5px",
          }}
          renderInput={(props) => <input {...props} />}
        />
      </div>
      <div className="d-flex justify-conetent-center align-items-center flex-column">
        <p className="text-center"> {timer} sec</p>
        <button className="forget_pass btn " onClick={() => handleResend()}>
          code resent
        </button>
      </div>
      <FormButton content="Next" onClick={() => dispatch(setStep(5))} />
    </div>
  );
}
