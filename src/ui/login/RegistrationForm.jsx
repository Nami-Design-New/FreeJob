import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { setStep } from "../../redux/slices/authModalSlice";
import FormButton from "../form/FormButton";
import FormInput from "../form/FormInput";
import BackButton from "./BackButton";
import { useDispatch } from "react-redux";
export default function RegistrationForm() {
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  return (
    <div className="left_side">
      <BackButton />
      <header className="modal_header pb-3 ">
        <h1 className="text-center">Complete your information</h1>
      </header>
      <form action="" className="user_data row row-gap-2 ">
        <div className="col-12 ">
          <input type="file" />
        </div>
        <div className="col-12">
          <FormInput label="Name" />
        </div>

        <div className="col-6">
          <FormInput label="Age" />
        </div>
        <div className="col-6">
          <FormInput label="Country" />
        </div>
        <div className=" col-12 mt-3">
          <label className="fw-normal">Phone Number</label>

          <PhoneInput
            defaultCountry="ua"
            value={phone}
            onChange={(phone) => setPhone(phone)}
            style={{ width: "100%", marginTop: "0.5rem" }}
            inputStyle={{
              border: "none",
              width: "100%",
              marginLeft: "0.75rem",
              borderRadius: "0.5rem",
              backgroundColor: "#E8FAF4",
            }}
          />
        </div>
        <FormButton content="Next" onClick={() => dispatch(setStep(6))} />
      </form>
    </div>
  );
}
