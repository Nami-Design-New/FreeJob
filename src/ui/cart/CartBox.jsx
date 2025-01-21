import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaFile, FaMinus, FaPlus, FaTrash, FaUsers } from "react-icons/fa";
import { Link } from "react-router";
import { toast } from "react-toastify";
import {
  decreaseCartQuantity,
  deleteCartItem,
  increaseCartQuantity,
  updateDevelopmentsInCart,
} from "../../services/apiCart";

function CartBox({ item, cartObjList }) {
  const { t } = useTranslation();
  const [totalPrice, setTotalPrice] = useState(0);
  const [formLoading, setFormLoading] = useState(0);
  const queryClient = useQueryClient();
  const [boxDevs, setBoxDevs] = useState([]);

  useEffect(() => {
    if (cartObjList && item) {
      setBoxDevs(
        cartObjList.filter((i) => {
          return i.service_id === item.service_id;
        })
      );
    }
  }, [item, cartObjList]);

  useEffect(() => {
    const developmentsPrice = item?.service?.developments
      ?.filter((dev) => dev.in_cart)
      .reduce((acc, dev) => acc + dev.price, 0);
    setTotalPrice(
      item?.quantity * item?.service?.price + developmentsPrice * item?.quantity
    );
  }, [item]);

  const handleDeleteBox = async (id) => {
    try {
      await deleteCartItem(id, queryClient);
      toast.success(t("cart.deleteSuccess"));
    } catch (error) {
      console.error(error);
    }
  };

  const increaseItemQuantity = async (id) => {
    try {
      setFormLoading(true);
      await increaseCartQuantity(id, queryClient);
    } catch (error) {
      console.error(error);
    } finally {
      setFormLoading(false);
    }
  };

  const decreaseItemQuantity = async (id) => {
    try {
      setFormLoading(true);
      await decreaseCartQuantity(id, queryClient);
    } catch (error) {
      console.error(error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleCheckboxChange = async (dev_id, cart_id) => {
    try {
      await updateDevelopmentsInCart(
        {
          cart_id: cart_id,
          development_id: dev_id,
        },
        queryClient
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" container mt-4">
      <div className=" service row ">
        <button
          className="delete_btn"
          onClick={() => handleDeleteBox(item?.id)}
          disabled={formLoading}
        >
          <FaTrash />
        </button>
        <div className="service-head col-md-6 col-lg-4 p-0">
          <Link
            to={`/services/${item?.service?.id}/${item?.service?.title}`}
            className="img"
          >
            <img src={item?.service?.image} alt="service" />
          </Link>{" "}
          <div className="owner">
            <div className="owner-avatar">
              <img src={item?.service?.user?.image} alt="owner" />
            </div>
            <section>
              <p>{item?.service?.user?.name}</p>
              <p>
                <FaFile /> 2 services <FaUsers /> clintes
              </p>
            </section>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="title">
            <h5>{item?.service?.name}</h5>
            <p>
              <FaFile /> Developments available for this service
            </p>
          </div>
          {item?.service?.developments &&
            item?.service?.developments.length > 0 && (
              <div className="more_develop">
                {item?.service?.developments.map((dev) => (
                  <div className=" input-field " key={dev?.id}>
                    <input
                      type="checkbox"
                      id={`check-${dev.id}`}
                      className="add_on"
                      name={`check-${dev.id}`}
                      checked={boxDevs[0]?.developments?.includes(dev.id)}
                      onChange={() => handleCheckboxChange(dev.id, item?.id)}
                    />
                    <div className="label">
                      <p>Design (2) 3d Images</p>
                      <label htmlFor={`check-${dev.id}`}>
                        {t("services.compare")} {dev.price}${" "}
                        {t("services.percentageofExtraService")}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>

        <div className="add_cart col-lg-4">
          <div className="total">
            <div className="total_price">
              <h6>{t("services.total")} :</h6>
              <p className="mb-0">{totalPrice}$</p>{" "}
            </div>
            <p className="added_develop">
              {item?.service?.developments?.filter((e) => e.in_cart).length >
                0 && (
                <span>
                  +
                  <span id="num">
                    {
                      item?.service?.developments.filter((e) => e.in_cart)
                        .length
                    }
                  </span>{" "}
                  {t("services.extraService")}
                </span>
              )}
            </p>
          </div>

          <div className="input_field">
            <button
              className="add"
              disabled={formLoading}
              onClick={() => increaseItemQuantity(item?.id)}
            >
              <FaPlus />
            </button>
            <input type="number" min={1} readOnly value={item?.quantity} />
            <button
              className="minus"
              disabled={formLoading}
              onClick={() => decreaseItemQuantity(item?.id)}
            >
              <FaMinus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CartBox;
