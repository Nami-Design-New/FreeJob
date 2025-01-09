import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import FirstStep from "../ui/AddService/FirstStep";
import SecondStep from "../ui/AddService/SecondStep";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
const skills = [
  { id: "1", name: "HTML" },
  { id: "2", name: "CSS" },
  { id: "3", name: "JavaScript" },
  { id: "4", name: "React" },
  { id: "5", name: "Node.js" },
  { id: "6", name: "Redux" },
  { id: "7", name: "MongoDB" },
  { id: "8", name: "Bootstrap" },
  { id: "9", name: "Tailwind CSS" },
  { id: "10", name: "Firebase" },
  { id: "11", name: "GraphQL" },
  { id: "12", name: "Docker" },
  { id: "13", name: "Python" },
  { id: "14", name: "Django" },
];

export default function AddService() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [originalData, setOriginalData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
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
    let service = false;
    //  {
    //   id: 1,
    //   title: "React App Development",
    //   description: "Create a beautiful and user-friendly React app",
    //   days: 30,
    //   price: 100,
    //   instructions: "Create a new React app using create-react-app",
    //   images: [],
    //   developments: [],
    //   sub_category_id: "1",
    //   skills: ["1", "2", "3", "4", "5", "6"],
    //   delete_images: [],
    //   delete_developments: [],
    // };
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
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);

    // check if data is changed
    const isDataChanged =
      JSON.stringify(formData) !== JSON.stringify(originalData);
    if (!isDataChanged) {
      toast.warning("");
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
      navigate("/profile");
    } catch {
      toast.error("Failed to update service");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <FirstStep
            setStep={setCurrentStep}
            formData={formData}
            setFormData={setFormData}
            categoryId={categoryId}
            setCategoryId={setCategoryId}
            skills={skills}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
        );
      case 2:
        return (
          <SecondStep
            setStep={setCurrentStep}
            formData={formData}
            setFormData={setFormData}
            loading={loading}
            // isEdit={service?.id ? true : false}
          />
        );

      default:
        return <FirstStep setStep={setCurrentStep} />;
    }
  };
  return (
    <>
      <ProgressBar min={0} max={2} now={currentStep} />
      <section className=" col-lg-8 container my-5">
        <form className="" onSubmit={handleSubmit}>
          {renderStep()}
        </form>
      </section>
    </>
  );
}
