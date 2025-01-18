import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CiEdit } from "react-icons/ci";
import { FaCartPlus, FaMinus, FaPlus } from "react-icons/fa6";
import { LiaFileSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../redux/slices/authModalSlice";
import CollectionModal from "../../modals/CollectionModal";
import ServiceDetailsSectionHeader from "./ServiceDetailsSectionHeader";
import ServiceSlider from "./ServiceSlider";
export default function ServiseDetailsComponent({
  service,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
  handleAddTocart,
  handleCheckboxChange,
  cartObj,
  formLoading,
  totalPrice,
  inCart,
}) {
  const isLogged = useSelector((state) => state.authedUser.isLogged);
  console.log(isLogged);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showCollectionModel, setShowCollectionModel] = useState(false);

  return (
    <section className="service_details_component">
      <ServiceSlider images={service?.images} />
      <section className="service_description">
        <ServiceDetailsSectionHeader title="Service Description">
          <LiaFileSolid />
        </ServiceDetailsSectionHeader>
        <p>{service?.description}</p>
      </section>
      {service?.instructions && (
        <section className="buyer_instructions">
          <ServiceDetailsSectionHeader title={t("services.instructions")}>
            <CiEdit />
          </ServiceDetailsSectionHeader>
          <ul>
            <li>{service?.instructions}</li>
          </ul>
        </section>
      )}
      {service?.is_my_service === false && (
        <>
          {service?.developments && service?.developments.length > 0 && (
            <section className="adds_on">
              <ServiceDetailsSectionHeader
                title={t("services.developmentsAvailable")}
              >
                <LiaFileSolid />
              </ServiceDetailsSectionHeader>
              <ul>
                {service?.developments.map((development) => (
                  <li key={development?.id}>
                    <input
                      type="checkbox"
                      id={`check-${development.id}`}
                      name={`check-${development.id}`}
                      checked={cartObj.developments.includes(development.id)}
                      onChange={() => handleCheckboxChange(development.id)}
                    />
                    <label htmlFor={`check-${development.id}`}>
                      <p> {development.description}</p>
                      <p>
                        {" "}
                        {t("services.compare")} {development.price}{" "}
                        {t("services.percentageofExtraService")}
                      </p>
                    </label>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <section>
            <div className="add_cart">
              <div className="input_field">
                <button
                  className="add"
                  disabled={formLoading}
                  onClick={handleIncreaseQuantity}
                >
                  <FaPlus />
                </button>
                <input
                  type="number"
                  min={1}
                  readOnly
                  value={cartObj.quantity}
                />
                <button className="minus" onClick={handleDecreaseQuantity}>
                  <FaMinus />
                </button>
              </div>
              <div className="total d-flex justify-content-between align-items-center">
                <p>
                  {t("services.total")} : <br />
                  {cartObj.developments.length > 0 && (
                    <span>
                      + <span id="num"> {cartObj.developments.length}</span>
                      {t("services.extraService")}
                    </span>
                  )}
                </p>
                <h6> {totalPrice || 0}</h6>
              </div>
              <div className="d-flex w-100 gap-2">
                {!inCart && (
                  <button className="request_order" onClick={handleAddTocart}>
                    <FaCartPlus />
                    {t("services.addToCart")}
                  </button>
                )}
                <button
                  className="request_order"
                  onClick={() => {
                    if (isLogged !== true) {
                      dispatch(openModal());
                    } else {
                      setShowCollectionModel(true);
                    }
                  }}
                >
                  <FaPlus />
                  {t("cart.addToCollection")}
                </button>
              </div>
            </div>
          </section>{" "}
          <CollectionModal
            setShowModal={setShowCollectionModel}
            showModal={showCollectionModel}
            showDeleteFromCart={false}
          />
        </>
      )}
    </section>
  );
}
