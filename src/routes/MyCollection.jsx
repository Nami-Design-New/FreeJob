import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CiEdit } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import useGetCollection from "../hooks/collections/useGetCollection";
import {
  addCollectionToCart,
  removeCollection,
} from "../services/apiCollections";
import ServiceCard from "../ui/cards/ServiceCard";
import DataLoader from "../ui/DataLoader";
import EditCollectionModal from "../ui/modals/EditCollectionModal";
import ConfirmationModal from "../ui/profile/ConfirmationModal";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";

const MyCollection = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: collection, isLoading } = useGetCollection();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const deleteCollection = async () => {
    setLoading(true);
    try {
      await removeCollection(Number(id), queryClient);
      toast.success(t("cart.collectionDeletedSuccessfully"));
      setShowModal(false);
      navigate("/my-collections");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddtoCart = async () => {
    try {
      const res = await addCollectionToCart(Number(id), queryClient);
      if (res?.code === 200) {
        toast.success(t("cart.collectionAddedToCart"));
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) {
    <DataLoader />;
  }

  return (
    <>
      <section className="collections_header_container ">
        <section className="container-md">
          <DetailsHeader links={t("navbar.myCollections")} />
          <section className="actions_collecion">
            <button className="add_btn" onClick={handleAddtoCart}>
              {t("cart.addToCart")}
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
      <ConfirmationModal
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
        collection={collection?.data}
      />
    </>
  );
};

export default MyCollection;
