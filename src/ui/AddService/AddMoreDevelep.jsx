import FormInput from "../form/FormInput";
import { IoCloseOutline } from "react-icons/io5";

const AddMoreDevelopCard = ({
  handleRemoveDev,
  index,
  development,
  onDevChange,
}) => {
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
          label="Development Name"
          placeholder="Example Website design and Development"
          value={development.description}
          onChange={(e) => onDevChange(e, index)}
        />
        <section className="row">
          <FormInput
            id={`price-${index}`}
            name="price"
            type="number"
            min={0}
            label="Price"
            placeholder="Development price"
            value={development.price}
            onChange={(e) => onDevChange(e, index)}
            className="col-md-6"
          />
          <FormInput
            id={`duration-${index}`}
            name="duration"
            type="number"
            min={0}
            label="Development Duration"
            placeholder="Development Duration"
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
