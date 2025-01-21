import { useDispatch } from "react-redux";
import { setStep } from "../../redux/slices/authModalSlice";

export default function LoginOptions() {
  const dispatch = useDispatch();
  return (
    <div className="left_side ">
      <header className="modal_header">
        <h1>Joun us Now</h1>
        <p>Do you already have an account? Log in now</p>
      </header>
      <div className="buttons ">
        <button onClick={() => dispatch(setStep(2))}>
          <img src="/images/envelope.png" />
          <span>Continue with email</span>
        </button>
        <p>OR</p>
        <button>
          <img src="/images/google.png" /> <span>Continue with Google</span>
        </button>
        <button>
          <img src="/images/envelope.png" />
          <span>Continue with email</span>
        </button>
      </div>
    </div>
  );
}
