import { CiCreditCard1 } from "react-icons/ci";
import {
  FaGlobe,
  FaRegEdit,
  FaRegEnvelope,
  FaRegTrashAlt,
} from "react-icons/fa";
import { IoHomeOutline, IoLocation } from "react-icons/io5";
export default function BankCard({ account }) {
  return (
    <section className="bank_card ">
      <section className="bank_img_container ">
        <img src="./images/bank.png" />
      </section>
      <section className="bank_info">
        <h2>{account.bankName}</h2>
        <section className="account_info">
          <p>
            <IoLocation />
            {account.location}
          </p>
          <p>
            <IoHomeOutline />
            {account.address.map((adsress, index) => (
              <section key={index}>{adsress},</section>
            ))}
          </p>
          <p>
            <CiCreditCard1 />
            {account.iban}
          </p>
          <p>
            <FaGlobe />
            {account.branchCode}
          </p>
          <p>
            <FaRegEnvelope />
            {account.accountNumber}
          </p>
        </section>
      </section>
      <section className="buttons_bank_container">
        <button>
          <FaRegTrashAlt />
        </button>
        <button>
          <FaRegEdit />
        </button>
      </section>
    </section>
  );
}
