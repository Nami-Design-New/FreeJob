import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import useCartList from "../hooks/cart/useCartList";
import useGetComments from "../hooks/services/useGetComments";
import useGetRates from "../hooks/services/useGetRates";
import useServiceDetails from "../hooks/services/useServiceDetails";
import { openModal } from "../redux/slices/authModalSlice";
import { updateEntireCart } from "../redux/slices/cartSlice";
import {
  addToCart,
  decreaseCartQuantity,
  increaseCartQuantity,
  updateDevelopmentsInCart,
} from "../services/apiCart";
import SimilarServices from "../ui/cards/SimilarServices";
import DataLoader from "../ui/DataLoader";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import ServiceRating from "../ui/servicesComponents/serviceDetails/ServiceRating";
import ServiseDetailsComponent from "../ui/servicesComponents/serviceDetails/ServiseDetailsComponent";
import ServiseOwner from "../ui/servicesComponents/serviceDetails/ServiseOwner";
import ErrorPage from "./ErrorPage";


export default function ServiceDetails() {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const queryClient = useQueryClient();
 

  const { data: service, isLoading } = useServiceDetails();
  const { data: rates } = useGetRates();
  const { data: cartQuery } = useCartList();
  const { data: comments } = useGetComments();

  const cart = useSelector((state) => state.cart.cartList);
  const user = useSelector((state) => state.authedUser.user);
  const isLogged = useSelector((state) => state.authedUser.isLogged);

  const [inCart, setInCart] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const [cartObj, setCartObj] = useState({
    service_id: service?.id,
    quantity: 1,
    developments: [],
  });
  useEffect(() => {
    if (cartQuery) {
      dispatch(
        updateEntireCart(
          cartQuery?.data?.map((item) => ({
            id: item.id,
            service_id: item.service?.id,
            quantity: item.quantity,
            developments: item?.service?.developments
              ?.filter((dev) => dev.in_cart)
              .map((dev) => dev.id),
          }))
        )
      );
    }
  }, [cartQuery, dispatch]);

  useEffect(() => {
    if (
      service?.accepted === 0 &&
      service?.refuse_reason !== null &&
      service?.user_id !== user?.id
    ) {
      navigate("/services");
    }
  }, [service, user, navigate]);
  useEffect(() => {
    if (cart && service) {
      const itemFromCart = cart?.find(
        (item) => item?.service_id === service?.id
      );
      const servicePrice = itemFromCart
        ? itemFromCart?.quantity * service?.price
        : service?.price;
      const developmentsTotalPrice =
        itemFromCart?.developments?.reduce((acc, devId) => {
          const development = service?.developments?.find(
            (dev) => dev.id === devId
          );
          return acc + (development?.price || 0);
        }, 0) || 0;
      setCartObj({
        id: itemFromCart?.id,
        service_id: service.id,
        quantity: itemFromCart ? itemFromCart.quantity : 1,
        developments: itemFromCart ? itemFromCart.developments : [],
      });
      setTotalPrice(
        (servicePrice || 0) +
          (developmentsTotalPrice || 0) * (itemFromCart?.quantity || 1)
      );
      if (itemFromCart?.id) {
        setInCart(true);
      }
    }
  }, [cart, service]);

  // increase quantity
  const handleIncreaseQuantity = async () => {
    if (inCart) {
      try {
        setFormLoading(true);
        await increaseCartQuantity(cartObj?.id, queryClient);
      } catch (error) {
        console.error(error);
      } finally {
        setFormLoading(false);
      }
    } else {
      setCartObj((prevCartObj) => ({
        ...prevCartObj,
        quantity: prevCartObj.quantity + 1,
      }));
    }
    const newQuantity = cartObj.quantity + 1;
    const developmentsTotalPrice =
      cartObj.developments.reduce((acc, devId) => {
        const development = service?.developments?.find(
          (dev) => dev.id === devId
        );
        return acc + (development?.price || 0);
      }, 0) * newQuantity;
    setTotalPrice((service?.price || 0) * newQuantity + developmentsTotalPrice);
  };
  // decrease quantity
  const handleDecreaseQuantity = async () => {
    if (cartObj.quantity > 1) {
      if (inCart) {
        try {
          setFormLoading(true);
          await decreaseCartQuantity(cartObj?.id, queryClient);
        } catch (error) {
          console.error(error);
        } finally {
          setFormLoading(false);
        }
      } else {
        setCartObj((prevCartObj) => ({
          ...prevCartObj,
          quantity: prevCartObj.quantity - 1,
        }));
      }
      const newQuantity = cartObj.quantity - 1;
      const developmentsTotalPrice =
        cartObj.developments.reduce((acc, devId) => {
          const development = service?.developments?.find(
            (dev) => dev.id === devId
          );
          return acc + (development?.price || 0);
        }, 0) * newQuantity;
      setTotalPrice(
        (service?.price || 0) * newQuantity + developmentsTotalPrice
      );
    } else return;
  };

  // developments
  const handleCheckboxChange = async (id) => {
    const isChecked = cartObj.developments.includes(id);
    if (inCart) {
      try {
        await updateDevelopmentsInCart(
          {
            cart_id: cartObj?.id,
            development_id: id,
          },
          queryClient
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      setCartObj((prevCartObj) => ({
        ...prevCartObj,
        developments: isChecked
          ? prevCartObj.developments.filter((item) => item !== id)
          : [...prevCartObj.developments, id],
      }));
    }
    setTotalPrice((prevTotalPrice) =>
      isChecked
        ? prevTotalPrice -
          (service?.developments?.find((item) => item?.id === id)?.price *
            cartObj?.quantity || 0)
        : prevTotalPrice +
          (service?.developments?.find((item) => item?.id === id)?.price *
            cartObj?.quantity || 0)
    );
  };
  // add to cart
  const handleAddToCart = async () => {
    if (!isLogged) {
      dispatch(openModal());
    } else {
      try {
        await addToCart(cartObj, queryClient);
        navigate("/cart");
      } catch (error) {
        console.error(error);
      }
    }
  };
  if (isLoading) {
    return <DataLoader />;
  }

  if (!isLoading && !service) {
    return <ErrorPage />;
  }
  return (
    <section className="service_details_page">
      <section className="header_container ">
        <section className="container-md ">
          <DetailsHeader links={t("routes.services")} />
          <p>{service.title}</p>
        </section>
      </section>
      <section className="container">
        <section className="row">
          <section className="col-lg-8">
            <ServiseDetailsComponent
              handleAddTocart={handleAddToCart}
              handleDecreaseQuantity={handleDecreaseQuantity}
              handleIncreaseQuantity={handleIncreaseQuantity}
              service={service}
              cartObj={cartObj}
              handleCheckboxChange={handleCheckboxChange}
              formLoading={formLoading}
              totalPrice={totalPrice}
              inCart={inCart}
           
            />
          </section>
          <section className="col-lg-4">
            <ServiseOwner service={service} />
            <button
              onClick={() => navigate("/profile")}
              className="go_profile_btn"
            >
              Go to Profile
            </button>
          </section>
          {rates?.data?.length > 0 && (
            <section className="row g-2  rating_container">
              <h6 className="header_rate">Service Rates</h6>
              {rates?.data?.map((rate) => (
                <section key={rate.id} className="col-md-6 ">
                  {<ServiceRating item={rate} />}
                </section>
              ))}
            </section>
          )}

          {service?.similar_services?.length > 0 && (
            <SimilarServices services={service?.similar_services} />
          )}
        </section>
      </section>
    </section>
  );
}
