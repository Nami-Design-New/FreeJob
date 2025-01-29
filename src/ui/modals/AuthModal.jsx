import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/slices/authModalSlice";
<<<<<<< HEAD
=======
import { t } from "i18next";
>>>>>>> 42d56f2cbf0c9c9c3b7e9771ff1c08925aba4e40
import EmailLogin from "../login/EmailLogin";
import EmailVerification from "../login/EmailVerification";
import LoginOptions from "../login/LoginOptions";
import LoginRightSide from "../login/LoginRightSide";
import RegistrationForm from "../login/RegistrationForm";
import UserNameEntry from "../login/UserNameEntry";
import RegistrationForm3 from "../login/RegistrationForm3";
import ForgetPassword from "../login/ForgetPassword";

export default function AuthModal() {
  const show = useSelector((state) => state.authModal.show);
  const [register, setRegister] = useState(false);
  const [userId, setUserId] = useState();
  const dispatch = useDispatch();

  const [forgetPassformData, setForgetPassformData] = useState({
    email: "",
  });

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
        return (
          <UserNameEntry
            forgetPassformData={forgetPassformData}
            setForgetPassformData={setForgetPassformData}
            setOtpData={setOtpData}
            setUserId={setUserId}
          />
        );
      case 4:
        return (
          <EmailVerification
            otpData={otpData}
            setOtpData={setOtpData}
            formData={formData}
            setFormData={setFormData}
            register={register}
            setRegister={setRegister}
            forgetPassformData={forgetPassformData}
            setForgetPassformData={setForgetPassformData}
          />
        );
      case 5:
        return (
          <RegistrationForm formData={formData} setFormData={setFormData} />
        );
      case 6:
        return (
          <RegistrationForm3
            formData={formData}
            setFormData={setFormData}
            setOtpData={setOtpData}
            register={register}
            setRegister={setRegister}
          />
        );
      case 7:
        return (
          <ForgetPassword
            formData={formData}
            setFormData={setFormData}
            setOtpData={setOtpData}
            register={register}
            setRegister={setRegister}
            userId={userId}
          />
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
      onHide={() => {
        dispatch(closeModal());
      }}
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
              {t("auth.copyRight")} {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
