import "react-international-phone/style.css";
import { useDispatch } from "react-redux";
import { setStep } from "../../redux/slices/authModalSlice";
import FormButton from "../form/FormButton";
import BackButton from "./BackButton";
import FormInput from "../form/FormInput";
import TabSelector from "./TapSelector";
import { useState } from "react";
import { toast } from "react-toastify";
export default function RegistrationForm3() {
  const [selected, setSelected] = useState("Seller");
  const [isLoading, setIsLoading] = useState("");
  const dispatch = useDispatch();

  return (
    <div className="left_side">
      <BackButton />
      <header className="modal_header pb-3 ">
        <h1 className="text-center">Complete your information</h1>
      </header>
      <form action="" className="user_data row row-gap-2 ">
        <div className="col-12 p-0">
          <FormInput label="Field" />
        </div>
        <div className="col-12 p-0">
          <FormInput label="Skills used" />
        </div>
        <div className="p-0 col-12">
          <label className="mb-2" htmlFor="">
            Are you a seller?
          </label>
          <TabSelector
            selected={selected}
            title1="Seller"
            title2="Not Seller"
            onSelect={setSelected}
          />
        </div>

        <FormButton content="Submit" onClick={() => dispatch(setStep(6))} />
      </form>
    </div>
  );
}
