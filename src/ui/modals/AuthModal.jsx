import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/slices/authModalSlice";
import EmailLogin from "../login/EmailLogin";
import EmailVerification from "../login/EmailVerification";
import LoginOptions from "../login/LoginOptions";
import LoginRightSide from "../login/LoginRightSide";
import RegistrationForm from "../login/RegistrationForm";
import UserNameEntry from "../login/UserNameEntry";
import RegistrationForm3 from "../login/RegistrationForm3";

export default function AuthModal() {
  const show = useSelector((state) => state.authModal.show);
  const dispatch = useDispatch();
  const [otpData, setOtpData] = useState({
    code: "",
    hashed_code: "",
  });
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    email: "",
    phone: "",
    age: "",
    password: "",
    is_freelance: false,
    job_title: "",
    categories: [],
    skills: [],
  });

  const currentStep = useSelector((state) => state.authModal.currentStep);
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <LoginOptions />;
      case 2:
        return <EmailLogin />;
      case 3:
        return <UserNameEntry setOtpData={setOtpData} />;
      case 4:
        return <EmailVerification otpData={otpData} setOtpData={setOtpData} />;
      case 5:
        return (
          <RegistrationForm formData={formData} setFormData={setFormData} />
        );
      case 6:
        return (
          <RegistrationForm3 formData={formData} setFormData={setFormData} />
        );
      default:
        return <LoginOptions />;
    }
  };

  return (
    <Modal
      centered
      size="xl"
      show={show}
      backdrop="static"
      onHide={() => dispatch(closeModal())}
      className="auth_modal"
    >
      <Modal.Body scrollable={true}>
        <div className="row position-relative h-100 p-0 g-0">
          <button
            className="close_modal"
            onClick={() => dispatch(closeModal())}
          >
            <IoMdClose />
          </button>

          <div className="d-none d-lg-flex col-6 p-0">
            <LoginRightSide />
          </div>

          <div className=" col-lg-6 p-0 h-100">
            {renderStep()}
            <p className="copy_right">
              Copy Rights Reserved {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
