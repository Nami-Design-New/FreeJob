import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import FirstStep from "../ui/AddService/FirstStep";
import SecondStep from "../ui/AddService/SecondStep";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { createService, updateService } from "../services/apiServices";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useServiceDetails from "../hooks/services/useServiceDetails";
import ErrorPage from "../routes/ErrorPage";
import useGetSkills from "../hooks/settings/useGetSkills";
const AddServices = () => {
  const { data: skills } = useGetSkills();
  const { id } = useParams();
  console.log(useParams());

  const totalSteps = 3;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: service, isLoading } = useServiceDetails();
  const [categoryId, setCategoryId] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState((step / totalSteps) * 100);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [originalData, setOriginalData] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    sub_category_id: "",
    description: "",
    days: "",
    price: "",
    instructions: "",
    images: [],
    skills: [],
    developments: [],
    delete_images: [],
    delete_developments: [],
  });

  useEffect(() => {
    if (service) {
      setCategoryId(service?.category?.id);
      const initialData = {
        id: service?.id,
        title: service?.title,
        description: service?.description,
        days: service?.days,
        price: service?.price,
        instructions: service?.instructions,
        images: service?.images,
        developments: service?.developments,
        sub_category_id: service?.sub_category_id,
        skills: service?.skills?.map((skill) => skill?.id) || [],
        delete_images: [],
        delete_developments: [],
      };
      setFormData(initialData);
      setOriginalData(initialData);
    }
  }, [service]);

  useEffect(() => {
    if (formData.skills?.length > 0) {
      const selectedOptions = formData.skills?.map((skillId) => {
        const option = skills?.find((opt) => opt.id === skillId);
        return {
          value: option?.id,
          label: option?.name,
        };
      });
      setSelectedOptions(selectedOptions);
    }
  }, [formData.skills, skills]);

  useEffect(() => {
    setProgress((step / totalSteps) * 100);
  }, [step]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // check if data is changed
    const isDataChanged =
      JSON.stringify(formData) !== JSON.stringify(originalData);
    if (!isDataChanged) {
      toast.warning(t("addService.noChangesMade"));
      setLoading(false);
      return;
    }

    const dataToSendForUpdate = {
      ...formData,
      images: formData.images.filter((image) =>
        image?.type?.startsWith("image/")
      ),
      developments: formData?.developments?.map((dev) => ({
        id: dev?.id || null,
        description: dev?.description,
        price: dev?.price,
        duration: dev?.duration,
      })),
    };

    try {
      if (service?.id) {
        const res = await updateService(dataToSendForUpdate, queryClient);
        if (res.status === 200) {
          toast.success(t("addService.updateSuccess"));
          navigate("/profile");
        } else {
          toast.error(res.message);
        }
      } else {
        const res = await createService(formData, queryClient);
        if (res.status === 200) {
          toast.success(t("addService.success"));
          navigate("/profile");
        } else {
          toast.error(res.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (id && !isLoading && !service) {
    return <ErrorPage />;
  }

  return (
    <section className="add-service">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-12 p-2 my-5">
            <ProgressBar striped animated now={progress} />
            <form className="form" onSubmit={handleSubmit}>
              {step === 1 && (
                <FirstStep
                  formData={formData}
                  setFormData={setFormData}
                  setStep={setStep}
                  categoryId={categoryId}
                  setCategoryId={setCategoryId}
                  skills={skills}
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions}
                />
              )}
              {step === 2 && (
                <SecondStep
                  setStep={setStep}
                  formData={formData}
                  setFormData={setFormData}
                  loading={loading}
                  isEdit={service?.id ? true : false}
                />
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddServices;
