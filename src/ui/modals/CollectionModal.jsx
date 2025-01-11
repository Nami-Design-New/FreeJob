import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
// import SelectField from "./../../ui/form-elements/SelectField";
// import useCollectionsList from "../../features/collections/useCollectionsList";
import FormInput from "../form/FormInput";
import FormTextArea from "../form/FormTextArea";
import SubmitButton from "../cart/SubmitCart";
import FormSelector from "../form/FormSelector";
// import SubmitButton from "../form-elements/SubmitButton";
// import InputField from "../form-elements/InputField";
// import TextField from "../form-elements/TextField";

function CollectionModal({ showModal, setShowModal, showDeleteFromCart }) {
  const { t } = useTranslation();

  const collections = {
    data: [
      { id: 1, title: "Collection 1" },
      { id: 2, title: "Collection 2" },
    ],
  };

  const [formType, setFormType] = useState("existing");
  const [formData, setFormData] = useState({
    id: "",
    delete_collection_from_cart: 0,
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const collectionOptions =
    collections?.data?.map((collection) => ({
      name: collection.title,
      value: collection.id,
    })) || [];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "checkbox"
          ? Number(e.target.checked)
          : e.target.value,
    });
  };

  function handleCloseModal() {
    setShowModal(false);
    setFormType("existing");
    setFormData({
      id: "",
      delete_collection_from_cart: 0,
      title: "",
      description: "",
    });
  }

  const handleAddToCollection = async () => {
    try {
      setLoading(true);
      const requestBody = {};
      if (formType === "new") {
        requestBody["title"] = formData.title;
        requestBody["description"] = formData.description;
        if (showDeleteFromCart) {
          requestBody["delete_collection_from_cart"] =
            formData.delete_collection_from_cart;
        }

        if (!requestBody["title"] || !requestBody["description"]) {
          toast.error(t("cart.fillAllFieldsToSubmit"));
          return;
        }
      } else if (formType === "existing") {
        requestBody["id"] = Number(formData.id);
        if (showDeleteFromCart) {
          requestBody["delete_collection_from_cart"] =
            formData.delete_collection_from_cart;
        }

        if (!requestBody["id"]) {
          toast.error(t("cart.selectCollectionToSubmit"));
          return;
        }
      }
      // await addToCollection(requestBody, queryClient);
      toast.success(t("cart.addToCollectionSuccess"));
      handleCloseModal();
    } catch (error) {
      handleCloseModal();
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      className="collection_modal_container"
      show={showModal}
      onHide={handleCloseModal}
      centered
    >
      <Modal.Header className="custom_modal_header pb-0" closeButton>
        <h5 className="m-0">
          {t(`cart.${formType === 1 ? "addCollection" : "addNewCollection"}`)}
        </h5>
      </Modal.Header>
      <hr />
      <Modal.Body className="pay_modal collection_modal">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddToCollection();
          }}
          className="form"
        >
          <section className="d-flex flex-column gap-3 w-100">
            <button
              className="add-new-collection-btn"
              onClick={() =>
                setFormType(() => (formType === "new" ? "existing" : "new"))
              }
            >
              {formType === "existing" && <i className="fa-light fa-plus"></i>}
              {t(
                `cart.${
                  formType === "new"
                    ? "addToExistingCollection"
                    : "addNewCollection"
                }`
              )}
            </button>
            {formType === "existing" && (
              <>
                <FormSelector
                  label={t("cart.collection")}
                  id="collection"
                  name="id"
                  disabledOption={t("select")}
                  value={formData.id}
                  onChange={handleChange}
                  options={collectionOptions}
                />
              </>
            )}
            {formType === "new" && (
              <>
                <FormInput
                  label={t("cart.collectionTitle")}
                  name="title"
                  type="text"
                  id="title"
                  required={true}
                  value={formData.title}
                  onChange={handleChange}
                />
                <section>
                  <label className="mb-2">Description</label>
                  <FormTextArea
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    label={t("cart.collectionDescription")}
                  />
                </section>
              </>
            )}
            {showDeleteFromCart && (
              <div className="d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  name="delete_collection_from_cart"
                  id="delete_collection_from_cart"
                  checked={formData.delete_collection_from_cart}
                  onChange={handleChange}
                />
                <label htmlFor="delete_collection_from_cart">
                  {t("cart.deleteCollectionFromCart")}
                </label>
              </div>
            )}
            <SubmitButton
              name={t("cart.add")}
              loading={loading}
              className="order-now"
              onClick={handleAddToCollection}
            />
          </section>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default CollectionModal;
