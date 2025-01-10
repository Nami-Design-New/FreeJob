import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { updateEntireCart } from "../redux/slices/cartSlice";
// import { deleteCart } from "../services/apiCart";
// import { createOrder } from "../services/apiOrders";
// import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import CartBox from "../ui/cart/CartBox";
import useCartList from "../features/cart/useCartList";
import emptyCart from "../Assets/images/emptyCart.svg";
import DataLoader from "../ui/DataLoader";
import SubmitButton from "./../ui/form-elements/SubmitButton";
import OrderModal from "./../ui/modals/OrderModal";
import CollectionModal from "../ui/modals/CollectionModal";
import ChargeModal from "./../ui/modals/ChargeModal";

const cartQuery = [
  {
    id: 1,
    service: {
      id: 101,
      name: "Service 1",
      price: 50,
      developments: [
        { id: 201, name: "Development 1", price: 10, in_cart: true },
        { id: 202, name: "Development 2", price: 20, in_cart: false },
      ],
    },
    quantity: 2,
    total: 100,
  },
  {
    id: 2,
    service: {
      id: 102,
      name: "Service 2",
      price: 75,
      developments: [
        { id: 203, name: "Development 3", price: 15, in_cart: true },
      ],
    },
    quantity: 1,
    total: 75,
  },
];

const Cart = () => {
  // const { data: cartQuery, isLoading } = useCartList();
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

  const chargeBallance = async () => {
    try {
    } catch (error) {
      throw new Error(error.message);
    } finally {
    }
  };

  const handleOrder = () => {
    user?.wallet < totalCartPrice
      ? setShowChargeModel(true)
      : setShowConfirmPayModel(true);
  };

  <section className="cart-section container">
    <section className="row">
      {cartQuery?.data && cartQuery?.data?.length > 0 ? (
        <>
          <section className="cart-header col-12 p-2">
            <span
              className="add-to-collection-btn mx-2"
              onClick={() => setShowCollectionModel(true)}
            >
              {t("cart.addToCollection")}
            </span>
          </section>
          <section className="col-12 p-2">
            {cartQuery?.data?.map((item) => (
              <CartBox
                item={item}
                key={item.id}
                cartObjList={cartObjList}
                setTotalCartPrice={setTotalCartPrice}
                totalCartPrice={totalCartPrice}
              />
            ))}
            <section className="col-lg-5 col-12 p-2">
              <section className="cartTotalPrice">
                <p>{t("cart.totalCart")}:</p>
                <h6 className="mb-0">
                  {totalCartPrice}
                  <i className="fa-solid fa-dollar-sign"></i>
                </h6>
              </section>
            </section>
            <section className="container">
              <section className="row justify-content-center responsive-gap">
                <section className="col-lg-6 col-md-6 col-12">
                  <button className="order-now" onClick={handleOrder}>
                    {t("services.orderNow")}
                  </button>
                </section>
                <section className="col-lg-6 col-md-6 col-12">
                  <SubmitButton
                    className="order-now delete"
                    name={t("cart.deleteCart")}
                    onClick={handleDelete}
                    loading={loading}
                  />
                </section>
              </section>
            </section>
          </section>
        </>
      ) : (
        <section className="col-12 p-2">
          <section className="empty_cart">
            <img src={emptyCart} alt="empty-cart" />
            <h3>{t("cart.empty")}</h3>
            <Link to="/services">{t("cart.exploreServices")}</Link>
          </section>
        </section>
      )}
    </section>
    <OrderModal
      setShowModal={setShowConfirmPayModel}
      showModal={showConfirmPayModel}
      ballance={user?.wallet}
      cartTotalPrice={totalCartPrice}
      eventFunction={handlePlaceOrder}
      chargeBallance={chargeBallance}
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
  </section>;
};

export default Cart;
