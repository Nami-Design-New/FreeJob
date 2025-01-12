// import React, { useState } from "react";
// import SectionHeader from "../ui/SectionHeader";
// import useGetCollection from "../features/collections/useGetCollection";
// import { useNavigate, useParams } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import EmptyData from "../ui/EmptyData";
// import ServiceCard from "../ui/cards/ServiceCard";
// import DataLoader from "./../ui/DataLoader";
// import { IconPencil, IconTrash } from "@tabler/icons-react";
// import { addCollectionToCart } from "../services/apiCollections";
// import { useQueryClient } from "@tanstack/react-query";
// import { toast } from "react-toastify";
// import useCartList from "../features/cart/useCartList";
// import ConfirmationModal from "../ui/modals/ConfirmationModal";
// import EditCollectionModal from "../ui/modals/EditCollectionModal";

import { useLocation, useNavigate, useParams } from "react-router";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import { FaTrash } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import ServiceCard from "../ui/cards/ServiceCard";
import { toast } from "react-toastify";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const collection = {
  id: "1",
  data: {
    title: "Mock Collection Title",
    services: [
      {
        id: "1",
        price: "200$",
        imageUrl: "https://placehold.co/313",
        name: "Songs and live broadcast application for PC",
        category: "Programming /Desktop",
        rate: "3",
        user: {
          imageUrl: "https://placehold.co/48",
          name: "Ahmed Mohamed",
          servicesNo: "2",
          clients: "2",
        },
      },
      {
        id: "2",
        price: "200$",
        imageUrl: "https://placehold.co/250",
        name: "Songs and live broadcast application for PC",
        category: "Programming /Desktop",
        rate: "3",
        user: {
          imageUrl: "https://placehold.co/48",
          name: "Ahmed Mohamed",
          servicesNo: "2",
          clients: "2",
        },
      },
      {
        id: "3",
        price: "200$",
        imageUrl: "https://placehold.co/250",
        name: "Songs and live broadcast application for PC",
        category: "Programming /Desktop",
        rate: "3",
        user: {
          imageUrl: "https://placehold.co/48",
          name: "Ahmed Mohamed",
          servicesNo: "2",
          clients: "2",
        },
      },
      {
        id: "4",
        price: "200$",
        imageUrl: "https://placehold.co/250",
        name: "Songs and live broadcast application for PC",
        category: "Programming /Desktop",
        rate: "3",
        user: {
          imageUrl: "https://placehold.co/48",
          name: "Ahmed Mohamed",
          servicesNo: "2",
          clients: "2",
        },
      },
    ],
  },

  isLoading: false,
};

const MyCollection = () => {
  const { pathname } = useLocation();
  const segments = pathname
    .split("/")
    .filter((segment) => segment === "my-collections")[0]
    .split("-")
    .join(" ");
  // const { id } = useParams();
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const deleteCollection = async () => {
    toast.success(t("cart.collectionDeletedSuccessfully"));
    setShowModal(false);
  };

  const handleAddtoCart = async () => {
    toast.success(t("cart.collectionAddedToCart"));
    navigate("/cart");
  };

  return (
    <>
   

      <section className="collections_header_container ">
        <section className="container-md">
          <DetailsHeader links={segments} />
          <section className="actions_collecion">
            <button className="btn" onClick={handleAddtoCart}>
              Add to Cart
            </button>
            <section className="edit_delete_btns">
              <button onClick={() => setShowEditModal(true)}>
                <CiEdit stroke={2} />
              </button>
              <button onClick={() => setShowModal(true)}>
                <FaTrash stroke={2} />
              </button>
            </section>{" "}
          </section>
        </section>
      
    </section>
      <section className="myCollections">
        <div className="container">
          <div className="row g-3">
            {collection?.data && collection?.data?.services?.length > 0
              ? collection?.data?.services?.map((service) => (
                  <section
                    className="col-lg-4 col-md-6 col-12 p2"
                    key={service?.id}
                  >
                    <ServiceCard service={service} />
                  </section>
                ))
              : null}
          </div>
        </div>
      </section>
      {/* <ConfirmationModal
        showModal={showModal}
        setShowModal={setShowModal}
        buttonText={t("cart.deleteCollection")}
        text={t("cart.areYouSureYouWantToDeleteThisCollection")}
        eventFun={deleteCollection}
        loading={loading}
      />
      <EditCollectionModal
        setShowModal={setShowEditModal}
        showModal={showEditModal}
        collection={collection}
      /> */}
    </>
  );
};

export default MyCollection;
