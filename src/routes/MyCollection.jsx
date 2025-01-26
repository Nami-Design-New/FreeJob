import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CiEdit } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import ServiceCard from "../ui/cards/ServiceCard";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";

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
            <button className="add_btn" onClick={handleAddtoCart}>
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
