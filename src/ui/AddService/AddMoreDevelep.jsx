import { useTranslation } from "react-i18next";
import FormInput from "../form/FormInput";
import { IoCloseOutline } from "react-icons/io5";

const AddMoreDevelopCard = ({
  handleRemoveDev,
  index,
  development,
  onDevChange,
}) => {
  const { t } = useTranslation();
  return (
    <section id="0" className="add_more_model">
      <section
        className="delete_model"
        onClick={() => handleRemoveDev(development, index)}
      >
        <IoCloseOutline />
      </section>
      <section className="d-flex flex-column gap-3">
        <FormInput
          id={`description-${index}`}
          name="description"
          required
          label={t("addService.devName")}
          placeholder={t("addService.moreDevtitlePlaceholder")}
          value={development.description}
          onChange={(e) => onDevChange(e, index)}
        />
        <section className="row">
          <FormInput
            id={`price-${index}`}
            name="price"
            type="number"
            required
            min={0}
            label={t("addService.price")}
            placeholder={t("addService.moreDevPricePlaceholder")}
            value={development.price}
            onChange={(e) => onDevChange(e, index)}
            className="col-md-6"
          />
          <FormInput
            id={`duration-${index}`}
            name="duration"
            type="number"
            required
            min={0}
            label={t("addService.duration")}
            placeholder={t("addService.moreDevDurationPlaceholder")}
            value={development.duration}
            onChange={(e) => onDevChange(e, index)}
            className="col-md-6"
          />
        </section>
      </section>
    </section>
  );
};

export default AddMoreDevelopCard;
