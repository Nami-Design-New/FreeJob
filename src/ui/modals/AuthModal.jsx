import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/slices/authModalSlice";
import { t } from "i18next";
import EmailLogin from "../login/EmailLogin";
import EmailVerification from "../login/EmailVerification";
import LoginOptions from "../login/LoginOptions";
import LoginRightSide from "../login/LoginRightSide";
import RegistrationForm from "../login/RegistrationForm";
import UserNameEntry from "../login/UserNameEntry";
import RegistrationForm3 from "../login/RegistrationForm3";
import ForgetPassword from "../login/ForgetPassword";
import { FormProvider } from "react-hook-form";
import useRegisterForm from "../../validations/useRegisterForm";

export default function AuthModal() {
  const show = useSelector((state) => state.authModal.show);
  const methods = useRegisterForm();
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
            {currentStep === 1 && <LoginOptions />}
            {currentStep == 2 && <EmailLogin />}
            {currentStep === 3 && (
              <UserNameEntry
                forgetPassformData={forgetPassformData}
                setForgetPassformData={setForgetPassformData}
                setOtpData={setOtpData}
                setUserId={setUserId}
              />
            )}
            {currentStep === 4 && (
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
            )}
            <FormProvider {...methods}>
              {currentStep === 5 && (
                <RegistrationForm
                  setOtpData={setOtpData}
                  setRegister={setRegister}
                />
              )}
              {currentStep === 6 && (
                <RegistrationForm
                  setOtpData={setOtpData}
                  setRegister={setRegister}
                />
              )}
            </FormProvider>
            {currentStep === 7 && (
              <ForgetPassword
                formData={formData}
                setFormData={setFormData}
                setOtpData={setOtpData}
                register={register}
                setRegister={setRegister}
                userId={userId}
              />
            )}
            <p className="copy_right">
              {t("auth.copyRight")} {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
