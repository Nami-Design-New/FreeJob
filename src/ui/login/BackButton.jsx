import { FaChevronLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../../redux/slices/authModalSlice";

export default function BackButton() {
  const currentStep = useSelector((state) => state.authModal.currentStep);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(setStep(currentStep - 1))}
      className="back_button"
    >
      <FaChevronLeft />
    </button>
  );
}
