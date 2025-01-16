import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import FormInput from "../form/FormInput";
import FormTextArea from "../form/FormTextArea";
import FormButton from "../form/FormButton";

const AddOffer = ({ id }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    project_id: id,
    price: "",
    description: "",
    days: "",
  });
  const isLogged = useSelector((state) => state.authedUser.isLogged);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (isLogged) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      navigate("/login");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogged) {
      setLoading(true);
      try {
        // await addProjectRequest(formData, queryClient);
        toast.success(t("projects.offerAddedSuccessfully"));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="add_offer">
      <h6>
        <FaPlus /> {t("projects.addOffer")}{" "}
      </h6>
      <form className="form" onSubmit={handleSubmit}>
        <section className="row m-0">
          <section className="col-lg-4 col-12 p-1">
            <FormInput
              label={t("projects.deliveryTime")}
              id="days"
              name="days"
              type="number"
              min={1}
              value={formData.days}
              onChange={handleChange}
              span={t("projects.days")}
            />
          </section>
          <section className="col-lg-4 col-12 p-1">
            <FormInput
              label={t("projects.price")}
              id="price"
              name="price"
              required
              type="number"
              value={formData.price}
              onChange={handleChange}
              span={"$"}
            />
          </section>
          <section className="col-lg-4 col-12 p-1">
            <FormInput
              required
              readOnly
              label={`${t("After fees")} 15% `}
              value={(formData.price * (100 - 15)) / 100}
            />
          </section>
          <section className="col-12 p-1">
            <FormTextArea
              label={t("projects.oferrDescription")}
              name="description"
              rows="8"
              onChange={handleChange}
              value={formData.description}
              required
            />
          </section>
          <section className="col-12 p-1 mt-2 d-flex justify-content-end">
            <FormButton content={t("projects.send")} disabled={loading} />
          </section>
        </section>
      </form>
    </section>
  );
};

export default AddOffer;
