import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { formatMoney } from "../../utils/helper";
const UserProfileCard = ({ user, isMyAccount }) => {
  console.log(user);
  const { t } = useTranslation();

  if (!user) {
    return null;
  }

  return (
    <div
      className="   
        profile-descripe
        d-flex flex-lg-row flex-column align-items-start justify-content-center "
    >
      <div className="cash profile-country-box mt-3">
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

      {/* {user?.skills && user?.skills?.length > 0 && (
          <div className="cash profile-skills-box mt-3">
            <div className="row">
              <div className="col-12 p-2">
                <div className="head">
                  <h4>{t("profile.skills")}</h4>
                </div>
              </div>
              <div className="profile-skills p-2 d-flex flex-wrap gap-2">
                {user?.skills?.map(
                  (skill) =>
                    skill?.name && (
                      <div className="cash-info" key={skill.id}>
                        <h6>{skill.name}</h6>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        )} */}

      <div className="cash mt-3">
        <div className="row gx-1">
          <h4>{t("profile.balance")}</h4>
          {isMyAccount && (
            <div className="col-4 ">
              <div className="head">
                <Link to="/balance">{t("profile.withdraw")}</Link>{" "}
                <Link to="/balance">{t("profile.deposit")}</Link>
              </div>
            </div>
          )}
          <div className="col-2   ">
            <div className="cash-info" style={{ backgroundColor: "#003912" }}>
              <h6>
                {formatMoney(user?.total_balance)}{" "}
                {/* <i className="fa-solid fa-dollar-sign"></i> */}
              </h6>
              <span className="d-flex align-items-center ">
                {t("balance.totalBalance")}
              </span>
            </div>
          </div>
          <div className="col-2 ">
            <div className="cash-info" style={{ backgroundColor: "#9B0D0D" }}>
              <h6>
                {formatMoney(user?.pending_balance)}{" "}
                {/* <i className="fa-solid fa-dollar-sign"></i> */}
              </h6>
              <span className="d-flex align-items-center ">
                {t("balance.pendingBalance")}
              </span>
            </div>
          </div>
          <div className="col-2 ">
            <div className="cash-info" style={{ backgroundColor: "#014169" }}>
              <h6>
                {formatMoney(user?.available_balance)}{" "}
                {/* <i className="fa-solid fa-dollar-sign"></i> */}
              </h6>
              <span className="d-flex align-items-center ">
                {t("balance.availableBalance")}
              </span>
            </div>
          </div>
          <div className="col-2">
            <div className="cash-info" style={{ backgroundColor: "#E8C201" }}>
              <h6>
                {formatMoney(user?.wallet)}{" "}
                {/* <i className="fa-solid fa-dollar-sign"></i> */}
              </h6>
              <span className="d-flex align-items-center ">
                {t("balance.wallet")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
