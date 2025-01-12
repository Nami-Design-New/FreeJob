import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import { updateEntireCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import CartBox from "../ui/cart/CartBox";
// import ChargeModal from "../ui/modals/ChargrModal";
// import OrderModal from "../ui/modals/OrderModal";
import CollectionModal from "../ui/modals/CollectionModal";
import SubmitButton from "../ui/cart/SubmitCart";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import { FaTrash } from "react-icons/fa";

const cartQuery = [
  {
    id: 1,
    service: {
      id: 101,
      name: "Service 1",
      imageUrl: "https://placehold.co/600x400",

      price: 50,

      user: {
        name: "Mahmod Ahmed",
        date: 3 - 10 - 2024,
        rate: "3",
        image: "https://placehold.co/58",
      },

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
      imageUrl: "https://placehold.co/600x400",
      onwerImg: "https://placehold.co/48",
      price: 75,
      user: {
        name: "Mahmod Ahmed",
        date: 3 - 10 - 2024,
        rate: "3",
        image: "https://placehold.co/58",
      },
      developments: [
        { id: 203, name: "Development 3", price: 15, in_cart: true },
      ],
    },
    quantity: 1,
    total: 75,
  },
];

const Carts = () => {
  // const { data: cartQuery, isLoading } = useCartList();
  const wallet = "30;";
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
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter((segment) => segment === "cart");
  useEffect(() => {
    const newCartObjList = cartQuery.map((item) => ({
      service_id: item?.service?.id,
      quantity: item?.quantity,
      developments: item?.service?.developments
        ?.filter((dev) => dev.in_cart !== false)
        .map((dev) => dev.id),
    }));
    setCartObjList(newCartObjList);
    setTotalCartPrice(
      cartQuery?.reduce((acc, item) => {
        return acc + item?.total;
      }, 0)
    );
  }, [cartQuery]);

  useEffect(() => {
    function handleCartChange() {
      dispatch(
        updateEntireCart(
          cartQuery?.map((item) => ({
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
  }, [cartQuery, dispatch]);

  const handleDelete = async () => {};

  const handlePlaceOrder = async () => {
    try {
      setPayLoading(true);
      // await createOrder(queryClient);
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
      setLoading(true);
      // await chargeBallance(queryClient);
      toast.success(t("cart.chargeSuccess"));
      setShowChargeModel(false);
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = () => {
    wallet < totalCartPrice
      ? setShowChargeModel(true)
      : setShowConfirmPayModel(true);
  };

  return (
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
          {cartQuery && cartQuery.length > 0 ? (
            <>
              <section className=" col-12 p-2">
                {cartQuery?.map((item) => {
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
                  <SubmitButton
                    className=" delete"
                    onClick={handleDelete}
                    loading={loading}
                    icon={<FaTrash />}
                  />
                </section>
              </section>
            </>
          ) : (
            <section className="col-12 p-2">
              <section className="empty_cart">
                <img src="./images/emptyCard.svg" alt="empty-cart" />
                <h3>{t("cart.empty")}</h3>
                <Link to="/services">{t("cart.exploreServices")}</Link>
              </section>
            </section>
          )}
        </section>
      </section>
      {/* <OrderModal
      setShowModal={setShowConfirmPayModel}
      showModal={showConfirmPayModel}
      ballance={user?.wallet}
      cartTotalPrice={totalCartPrice}
      eventFunction={handlePlaceOrder}
      chargeBallance={chargeBallance}
      loading={payLoading}
    /> */}
      <CollectionModal
        setShowModal={setShowCollectionModel}
        showModal={showCollectionModel}
        showDeleteFromCart={true}
      />
      {/* // <ChargeModal
       showModal={showChargeModel}
     setShowModal={setShowChargeModel}
     cartTotalPrice={totalCartPrice}
    />  */}
    </section>
  );
};

export default Carts;
