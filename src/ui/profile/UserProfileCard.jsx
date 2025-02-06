import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { FaEdit } from "react-icons/fa";
import { formatMoney } from "../../utils/helper";
import StarsRate from "../StartRate";
const UserProfileCard = ({ user, isMyAccount }) => {
  console.log(user);
  const { t } = useTranslation();

  if (!user) {
    return null;
  }

  return (
    <div className="profile-descripe mb-5">
      <div className="cash profile-country-box">
        <ul className="verify-list">
          <li className="d-flex gap-2">
            {user?.verified === 1 ? <span>✔</span> : <span>✘</span>}
            {t("profile.personalIdentification")}
          </li>
          <li className="d-flex gap-2">
            {user?.phone_verified === 1 ? <span>✔</span> : <span>✘</span>}
            {t("profile.phoneNumber")}
          </li>
          <li className="d-flex gap-2">
            <span>✔</span>
            {t("profile.emailAddress")}
          </li>
        </ul>

        <div className="country-wrapper ">
          {isMyAccount && (
            <>
              <div className="d-flex gap-2 flex-column">
                {user?.phone_verified === 0 && (
                  <div className="unverified-box">
                    <Link to="/verify-phone">{t("profile.verifyPhone")}</Link>
                  </div>
                )}
                {user?.verified === 0 && (
                  <div className="unverified-box">
                    <Link to="/verify-identity">
                      {t("profile.verifyYourIdentity")}
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
          {user?.country_id &&
            (user?.country?.name || user?.country?.image) && (
              <>
                <img src={user?.country?.image} alt="country" />
                <h6 className="">{user?.country?.name}</h6>
              </>
            )}
        </div>
      </div>

      <div className="userData">
        <div className="user-avatar">
          <img src={user?.image} alt="user-avatar" />
          {isMyAccount && (
            <Link to={"/edit-profile"} className="status">
              <FaEdit />
            </Link>
          )}
        </div>
        <div className="name-rate">
          <h6 className="mb-2">{t(user?.name)}</h6>
          <StarsRate rate={user?.rate || 0} />
        </div>
      </div>

      <div className="cash">
        <div className="d-flex gap-2">
          {isMyAccount ? (
            <>
              <div className="head">
                <Link to="/balance">{t("profile.withdraw")}</Link>{" "}
                <Link to="/balance">{t("profile.deposit")}</Link>
              </div>

              <div className="cash-info" style={{ backgroundColor: "#003912" }}>
                <h6>{formatMoney(user?.total_balance)} </h6>
                <span className="d-flex align-items-center ">
                  {t("balance.totalBalance")}
                </span>
              </div>

              <div className="cash-info" style={{ backgroundColor: "#9B0D0D" }}>
                <h6>{formatMoney(user?.pending_balance)}</h6>
                <span className="d-flex align-items-center ">
                  {t("balance.pendingBalance")}
                </span>
              </div>

              <div className="cash-info" style={{ backgroundColor: "#014169" }}>
                <h6>{formatMoney(user?.available_balance)} </h6>
                <span className="d-flex align-items-center ">
                  {t("balance.availableBalance")}
                </span>
              </div>

              <div className="cash-info" style={{ backgroundColor: "#E8C201" }}>
                <h6>{formatMoney(user?.wallet)} </h6>
                <span className="d-flex align-items-center ">
                  {t("balance.wallet")}
                </span>
              </div>
            </>
          ) : (
            <div className="statistics">
              <h4>الاحصائيات</h4>

              <div className="s_card">
                <h3>
                  40 <br />
                  خدمة
                </h3>
              </div>
              <div className="s_card">
                <img src="/images/round1.png" alt="" />
                <h3>
                  30 <br /> عميل
                </h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
