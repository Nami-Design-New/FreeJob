import "react-international-phone/style.css";
import { useDispatch } from "react-redux";
import { setStep } from "../../redux/slices/authModalSlice";
import FormButton from "../form/FormButton";
import BackButton from "./BackButton";
export default function RegistrationForm2() {
  const dispatch = useDispatch();
  return (
    <div className="left_side">
      <BackButton />
      <header className="modal_header pb-3 ">
        <h1 className="text-center">Complete your information</h1>
      </header>
      <form action="" className="user_data row row-gap-2 ">
        <label className="p-0">Introduction</label>
        <textarea className="introduction_area" cols={10} rows={7}></textarea>
        <FormButton content="Next" onClick={() => dispatch(setStep(7))} />
      </form>
    </div>
  );
}
