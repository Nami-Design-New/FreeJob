import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
// import { IconPencil, IconTrash } from "@tabler/icons-react";
import { toast } from "react-toastify";
// import {
//   removeCollection,
//   addCollectionToCart,
// } from "../../services/apiCollections";
// import ConfirmationModal from "../modals/ConfirmationModal";
// import EditCollectionModal from "../modals/EditCollectionModal";
import { formatTimeDifference, getTimeDifference } from "../../utils/helper";
import { FaCalendar, FaTrash } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { useState } from "react";
const CollectionCard = ({ collection }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  //   const { refetch } = useCartList();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  //   const queryClient = useQueryClient();

  const timeDifference = getTimeDifference(collection?.created_at);
  const startTime = formatTimeDifference(
    timeDifference.years,
    timeDifference.months,
    timeDifference.days,
    timeDifference.hours,
    timeDifference.minutes,
    t
  );

  const deleteCollection = async () => {
    setLoading(true);
    try {
      //   await removeCollection(collection?.id, queryClient);
      toast.success(t("cart.collectionDeletedSuccessfully"));
      setShowModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddtoCart = async () => {
    try {
      //   const res = await addCollectionToCart(collection?.id, queryClient);
      //   if (res?.code === 200) {
      toast.success(t("cart.collectionAddedToCart"));
      //   refetch();
      navigate("/cart");
      //   }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="col-lg-6 col-12  ">
      <section className="collectionCard">
        <section className="actions">
          <button onClick={() => setShowEditModal(true)}>
            <CiEdit stroke={2} />
          </button>
          <button onClick={() => setShowModal(true)}>
            <FaTrash stroke={2} />
          </button>
        </section>
        <section className="info">
          <h6>
            <Link to={`/my-collections/${collection?.id}`}>
              {collection?.title}
            </Link>
          </h6>
          <ul>
            <li>
              <i className="fa-regular fa-cubes"></i> <span>{}</span>
            </li>
            <li>
              <FaCalendar />
              <span>{startTime}</span>
            </li>
          </ul>
          <button className="btn" onClick={handleAddtoCart}>
            Add to Cart
          </button>
        </section>
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
    </section>
  );
};

export default CollectionCard;
