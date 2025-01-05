import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/slices/authModalSlice";
import EmailLogin from "../login/EmailLogin";
import EmailVerification from "../login/EmailVerification";
import LoginOptions from "../login/LoginOptions";
import LoginRightSide from "../login/LoginRightSide";
import RegistrationForm from "../login/RegistrationForm";
import UserNameEntry from "../login/UserNameEntry";
import RegistrationForm2 from "../login/RegistrationForm2";
import RegistrationForm3 from "../login/RegistrationForm3";

export default function AuthModal() {
  const show = useSelector((state) => state.authModal.show);
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.authModal.currentStep);
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <LoginOptions />;
      case 2:
        return <EmailLogin />;
      case 3:
        return <UserNameEntry />;
      case 4:
        return <EmailVerification />;
      case 5:
        return <RegistrationForm />;
      case 6:
        return <RegistrationForm2 />;
      case 7:
        return <RegistrationForm3 />;
      default:
        return <LoginOptions />;
    }
  };

  return (
    <Modal
      contentClassName="modal_height"
      dialogClassName="modal_height"
      centered
      size="lg"
      show={show}
      backdrop="static"
      onHide={() => dispatch(closeModal())}
    >
      <Modal.Body>
        <div className="row h-100 p-0 g-0">
          <div className="d-none d-lg-flex col-6  p-0">
            <LoginRightSide />
          </div>
          <div className="col-12 col-lg-6   p-0 h-100">
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
