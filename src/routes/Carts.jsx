import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import { updateEntireCart } from "../redux/slices/cartSlice";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { createOrder } from "../services/apiOrders";
import { deleteCart } from "../services/apiCart";
import CartBox from "../ui/cart/CartBox";
import CollectionModal from "../ui/modals/CollectionModal";
import useCartList from "./../hooks/cart/useCartList";
import DataLoader from "../ui/DataLoader";
import ChargeModal from "./../ui/modals/ChargrModal";
import OrderModal from "./../ui/modals/OrderModal";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";

const Carts = () => {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter((segment) => segment === "cart");
  const { data: cartQuery, isLoading } = useCartList();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartObjList, setCartObjList] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [payLoading, setPayLoading] = useState(false);
  const [showConfirmPayModel, setShowConfirmPayModel] = useState(false);
  const [showCollectionModel, setShowCollectionModel] = useState(false);
  const [showChargeModel, setShowChargeModel] = useState(false);
  const user = useSelector((state) => state.authedUser.user);

  useEffect(() => {
    if (cartQuery?.data?.length > 0) {
      const newCartObjList = cartQuery.data.map((item) => ({
        service_id: item?.service?.id,
        quantity: item?.quantity,
        developments: item?.service?.developments
          ?.filter((dev) => dev.in_cart !== false)
          .map((dev) => dev.id),
      }));
      setCartObjList(newCartObjList);
      setTotalCartPrice(
        cartQuery?.data?.reduce((acc, item) => {
          return acc + item?.total;
        }, 0)
      );
    }
  }, [cartQuery]);

  useEffect(() => {
    function handleCartChange() {
      dispatch(
        updateEntireCart(
          cartQuery?.data?.map((item) => ({
            id: item.id,
            service_id: item.service?.id,
            quantity: item.quantity,
            developments: item?.service?.developments?.map(
              (dev) => dev.in_cart === false && dev.id
            ),
          }))
        )
      );
    }

    window.addEventListener("load", handleCartChange);
    return () => window.removeEventListener("load", handleCartChange);
  }, [cartQuery, dispatch]);

  const queryClient = useQueryClient();

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteCart(queryClient);
      toast.success(t("cart.cartDelted"));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      setPayLoading(true);
      await createOrder(queryClient);
      toast.success(t("cart.orderSuccess"));
      setShowConfirmPayModel(false);
      navigate("/purchases");
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setPayLoading(false);
    }
  };

  const handleOrder = () => {
    user?.wallet < totalCartPrice
      ? setShowChargeModel(true)
      : setShowConfirmPayModel(true);
  };

  return isLoading ? (
    <DataLoader />
  ) : (
    <section className="cart-section">
      <section className="header_container ">
        <section className="container-md  ">
          <DetailsHeader links={segments} />{" "}
          <button
            className="add-to-collection-btn mx-2"
            onClick={() => setShowCollectionModel(true)}
          >
            {t("cart.addToCollection")}
          </button>
        </section>
      </section>
      <section className="container">
        <section className="row ">
          {cartQuery?.data && cartQuery?.data?.length > 0 ? (
            <>
              <section className=" col-12 p-2">
                {cartQuery?.data?.map((item) => {
                  return (
                    <CartBox
                      item={item}
                      key={item.id}
                      cartObjList={cartObjList}
                      setTotalCartPrice={setTotalCartPrice}
                      totalCartPrice={totalCartPrice}
                    />
                  );
                })}
                <section className=" col-12 p-2">
                  <section className="cartTotalPrice w-75">
                    <p>{t("cart.totalCart")}:</p>
                    <h6 className="mb-0">{totalCartPrice}$</h6>
                  </section>
                </section>
                <section className="container w-75 order-buttons">
                  <button className="order-now" onClick={handleOrder}>
                    {t("services.orderNow")}
                  </button>

                  <button
                    style={{ opacity: loading ? 0.7 : 1 }}
                    disabled={loading}
                    onClick={handleDelete}
                    className={`save delete`}
                  >
                    {loading ? (
                      <i
                        className={loading ? "fa-solid fa-spinner fa-spin" : ""}
                      />
                    ) : (
                      <FaTrash />
                    )}
                  </button>
                </section>
              </section>
            </>
          ) : (
            <section className="col-12 p-2">
              <section className="empty_cart">
                <img src="/images/emptyCart.svg" alt="empty-cart" />
                <h3>{t("cart.empty")}</h3>
                <Link to="/services">{t("cart.exploreServices")}</Link>
              </section>
            </section>
          )}
        </section>
      </section>
      <OrderModal
        setShowModal={setShowConfirmPayModel}
        showModal={showConfirmPayModel}
        ballance={user?.wallet}
        cartTotalPrice={totalCartPrice}
        eventFunction={handlePlaceOrder}
        loading={payLoading}
      />
      <CollectionModal
        setShowModal={setShowCollectionModel}
        showModal={showCollectionModel}
        showDeleteFromCart={true}
      />
      <ChargeModal
        showModal={showChargeModel}
        setShowModal={setShowChargeModel}
        cartTotalPrice={totalCartPrice}
      />
    </section>
  );
};

export default Carts;
