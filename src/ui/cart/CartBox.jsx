import { IconTrashFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  decreaseCartQuantity,
  deleteCartItem,
  increaseCartQuantity,
  updateDevelopmentsInCart,
} from "../../services/apiCart";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

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
    <div className="service container">
      <div className="row">
        <div className="col-lg-7 col-12">
          <div className="service-head">
            <Link to={`/services/${item?.service?.id}`} className="img">
              <img src={item?.service?.image} alt="service" />
            </Link>
            <div className="title">
              <h5>{item?.service?.title}</h5>
              <div className="owner">
                <div className="owner-avatar">
                  <img src={item?.service?.user?.image} alt="owner" />
                </div>
                <span>{item?.service?.user?.name}</span>
              </div>
            </div>
          </div>
          <div className="more-develop">
            {item?.service?.developments &&
              item?.service?.developments.length > 0 && (
                <div className="more-develop">
                  {item?.service?.developments.map((dev) => (
                    <div
                      className="d-flex input-field align-items-baseline"
                      key={dev?.id}
                    >
                      <input
                        type="checkbox"
                        id={`check-${dev.id}`}
                        name={`check-${dev.id}`}
                        checked={boxDevs[0]?.developments?.includes(dev.id)}
                        onChange={() => handleCheckboxChange(dev.id, item?.id)}
                      />
                      <div className="label">
                        <label htmlFor={`check-${dev.id}`}>
                          {dev.description}
                        </label>
                        <p>
                          {t("services.compare")} {dev.price}${" "}
                          {t("services.percentageofExtraService")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </div>
        </div>
        <div className="col-lg-5 col-12">
          <div className="add-cart">
            <div className="input-field">
              <button
                className="add"
                disabled={formLoading}
                onClick={() => increaseItemQuantity(item?.id)}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
              <input type="number" min={1} readOnly value={item?.quantity} />
              <button
                className="minus"
                disabled={formLoading}
                onClick={() => decreaseItemQuantity(item?.id)}
              >
                <i className="fa-solid fa-minus"></i>
              </button>
            </div>
            <div className="total d-flex justify-content-between align-items-center">
              <p>
                {t("services.total")} : <br />
                {item?.service?.developments?.filter((e) => e.in_cart).length >
                  0 && (
                  <span>
                    +{" "}
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
              <div className="d-flex gap-3 align-items-center">
                <h6 className="mb-0">
                  {totalPrice}
                  <i className="fa-solid fa-dollar-sign"></i>
                </h6>
                <button
                  className="delete_btn"
                  onClick={() => handleDeleteBox(item?.id)}
                  disabled={formLoading}
                >
                  <IconTrashFilled />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartBox;
