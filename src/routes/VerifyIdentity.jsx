import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Instructions from "../ui/profile/Instructions";
import VerifyStep3 from "../ui/profile/VerifyStep3";
import VerifyStep4 from "../ui/profile/VerifyStep4";

const VerifyIdentity = () => {
  const { t } = useTranslation();
  const totalSteps = 3;
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState((step / totalSteps) * 100);

  useEffect(() => {
    setProgress((step / totalSteps) * 100);
  }, [step]);

  return (
    <section className="login-section container">
      <h1 className="text-center">{t("auth.verifyPageTitle")}</h1>
      <p className="text-center mt-3 mb-4 title">
        {t("auth.verifyPageSubTitle")}
      </p>
      <div className="row justify-content-center">
        <div className="col-lg-8 col-12 p-2">
          <ProgressBar striped animated now={progress} />
          {step === 1 && <Instructions setStep={setStep} />}
          {step === 2 && <VerifyStep3 setStep={setStep} />}
          {step === 3 && <VerifyStep4 setStep={setStep} />}
        </div>
      </div>
    </section>
  );
};

export default VerifyIdentity;
