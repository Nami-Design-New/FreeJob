import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { addBank, editBank } from "../services/apiBanks";
import FormInput from "../ui/form/FormInput";
import DetailsHeader from "../ui/servicesComponents/serviceDetails/DetailsHeader";
import FormSelector from "../ui/form/FormSelector";
import FormButton from "../ui/form/FormButton";
import useCountriesList from "../hooks/settings/useCountries";
import useBanksList from "../hooks/accounts/useBankList";
import DataLoader from "../ui/DataLoader";

export default function AddBankAccount() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLoading, data: banks } = useBanksList();
  const [targetBank, setTargetBank] = useState();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    user_name: "",
    iban: "",
    swift: "",
    address1: "",
    address2: "",
    zip: "",
    city: "",
    area: "",
  });
  const { data: countries } = useCountriesList();
  const [countryId, setCountryId] = useState("");
  useEffect(() => {
    const bank = banks?.find((bank) => String(bank?.id) === id);
    setTargetBank(bank || null);
  }, [banks, id]);
  useEffect(() => {
    if (targetBank) {
      setFormData({
        user_name: targetBank?.user_name || "",
        iban: targetBank?.iban || "",
        swift: targetBank?.swift || "",
        address1: targetBank?.address1 || "",
        address2: targetBank?.address2 || "",
        zip: targetBank?.zip || "",
        city: targetBank?.city || "",
        area: targetBank?.area || "",
      });
      setCountryId(targetBank?.country_id || "");
    }
  }, [targetBank]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const requestBody = {
        ...formData,
        country_id: Number(countryId),
        id: targetBank?.id,
      };
      if (targetBank) {
        await editBank(requestBody, queryClient);
        toast.success(t("manageAccounts.bankUpdatedSuccessfully"));
      } else {
        await addBank(requestBody, queryClient);
        toast.success(t("manageAccounts.bankAddedSuccessfully"));
      }
      navigate("/manage-accounts");
      setFormData({
        user_name: targetBank?.user_name || "",
        iban: targetBank?.iban || "",
        swift: targetBank?.swift || "",
        address1: targetBank?.address1 || "",
        address2: targetBank?.address2 || "",
        zip: targetBank?.zip || "",
        city: targetBank?.city || "",
        area: targetBank?.area || "",
      });
      setCountryId(targetBank?.country_id || "");
      setTargetBank("");
    } catch (err) {
      throw new Error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="mb-5">
      <section className="header_container ">
        <section className="container-md  ">
          <DetailsHeader links={t("routes.addBank")} />
        </section>
      </section>

      <section className="add_banks_form_container">
        {isLoading ? (
          <DataLoader />
        ) : (
          <form className=" container" onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* name */}
              <section className="col-12 p-2">
                <FormInput
                  label={t("manageAccounts.userName")}
                  type="text"
                  name="user_name"
                  onChange={handleChange}
                  value={formData.user_name}
                  placeholder={t("writeHere")}
                />
              </section>
              {/* iban */}
              <section className="col-lg-6 col-12 p-2">
                <FormInput
                  label={t("manageAccounts.iban")}
                  type="text"
                  name="iban"
                  onChange={handleChange}
                  value={formData.iban}
                  placeholder="Eg2132132213"
                  required={true}
                />
              </section>
              {/* swift */}
              <section className="col-lg-6 col-12 p-2">
                <FormInput
                  label={t("manageAccounts.swift")}
                  type="number"
                  name="swift"
                  onChange={handleChange}
                  value={formData.swift}
                  placeholder="12345"
                  required={true}
                />
              </section>
              {/* address */}
              <section className="col-lg-6 col-12 p-2">
                <FormInput
                  label={`${t("manageAccounts.address")} 1`}
                  type="address"
                  name="address1"
                  onChange={handleChange}
                  value={formData.address1}
                  placeholder={t("writeHere")}
                  required={true}
                />
              </section>
              {/* address */}
              <section className="col-lg-6 col-12 p-2">
                <FormInput
                  label={`${t("manageAccounts.address")} 2`}
                  type="address"
                  name="address2"
                  onChange={handleChange}
                  value={formData.address2}
                  placeholder={t("writeHere")}
                />
              </section>
              {/* country */}
              <section className="col-lg-6 col-12 p-2">
                <FormSelector
                  label={t("manageAccounts.country")}
                  id="category"
                  name="category"
                  disabledOption={t("select")}
                  value={countryId}
                  required={true}
                  onChange={(e) => {
                    setCountryId(e.target.value);
                  }}
                  options={countries?.map((country) => ({
                    name: country.name,
                    value: country.id,
                  }))}
                />
              </section>
              {/* zip */}
              <section className="col-lg-6 col-12 p-2">
                <FormInput
                  label={t("manageAccounts.zip")}
                  type="text"
                  name="zip"
                  onChange={handleChange}
                  value={formData.zip}
                  placeholder="996"
                  required={true}
                />
              </section>
              {/* city */}
              <section className="col-lg-6 col-12 p-2">
                <FormInput
                  label={t("manageAccounts.city")}
                  type="text"
                  name="city"
                  onChange={handleChange}
                  value={formData.city}
                  placeholder={t("writeHere")}
                  required={true}
                />
              </section>
              {/* area */}
              <div className="col-lg-6 col-12 p-2">
                <FormInput
                  label={t("manageAccounts.area")}
                  type="text"
                  name="area"
                  onChange={handleChange}
                  value={formData.area}
                  placeholder={t("writeHere")}
                  required={true}
                />
              </div>
              <div className="mt-3 mb-3 ">
                <div className="checkbox-group">
                  <input type="checkbox" name="" id="fees" checked />
                  <label htmlFor="fees">
                    {t("manageAccounts.nameMatchingCondition")}
                  </label>
                </div>
                <div className="checkbox-group">
                  <input type="checkbox" name="" id="duration" checked />
                  <label htmlFor="duration">
                    {t("balance.durationCondition")}
                  </label>
                </div>
                <div className="checkbox-group">
                  <input type="checkbox" name="" id="responsibility" checked />
                  <label htmlFor="responsibility">
                    {t("manageAccounts.responsibilityCondition")}
                  </label>
                </div>
              </div>
              <div className="col-12 d-flex justify-content-center">
                <FormButton
                  content={
                    targetBank
                      ? t("manageAccounts.edit")
                      : t("manageAccounts.add")
                  }
                  loading={loading}
                  className="submit_add_account_button"
                />
              </div>
            </div>
          </form>
        )}
      </section>
    </section>
  );
}
