import { CiCreditCard1 } from "react-icons/ci";
import {
  FaGlobe,
  FaRegEdit,
  FaRegEnvelope,
  FaRegTrashAlt,
} from "react-icons/fa";
import { IoHomeOutline, IoLocation } from "react-icons/io5";
import ConfirmationModal from "../profile/ConfirmationModal";
import { useState } from "react";
import { deleteBank } from "../../services/apiBanks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
export default function BankCard({ bank }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const handleDelete = async () => {
    try {
      await deleteBank(bank?.id, queryClient);
      toast.success(t("manageAccounts.bankDeletedSuccessfully"));
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setShowConfirmation(false);
    }
  };
  const handleEdit = async () => {
    navigate(`/edit-bank-account/${bank.id}`);
  };
  return (
    <>
      <section className="bank_card ">
        <section className="bank_img_container ">
          <img src="/images/bank.png" />
        </section>
        <section className="bank_info">
          <h2>{bank?.user_name}</h2>
          {(bank?.city || bank?.area) && (
            <section className="account_info">
              <p>
                <IoLocation />
                {`${bank.city ? bank.city + "" : ""} ${
                  bank.city && bank.area ? ", " : ""
                } ${bank.area ? bank.area : ""}`}
              </p>
              <p>
                <IoHomeOutline />
                {`${bank.address1 ? bank.address1 + "" : ""} ${
                  bank.address2 && bank.address2 ? ", " : ""
                } ${bank.address2 ? bank.address2 : ""}`}
              </p>
              <p>
                <CiCreditCard1 />
                {bank.iban}
              </p>
              <p>
                <FaGlobe />
                {bank.swift}
              </p>
              <p>
                <FaRegEnvelope />
                {bank.zip}
              </p>
            </section>
          )}
        </section>
        <section className="buttons_bank_container">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowConfirmation(true);
            }}
          >
            <FaRegTrashAlt />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit();
            }}
          >
            <FaRegEdit />
          </button>
        </section>
      </section>
      <ConfirmationModal
        showModal={showConfirmation}
        setShowModal={setShowConfirmation}
        type="delete"
        eventFun={handleDelete}
        buttonText={t("profile.delete")}
        text={t("manageAccounts.areYouSureYouWantToDelete")}
      />
    </>
  );
}
