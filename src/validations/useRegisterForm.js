import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

export const REGISTRATION_FORM_DEFAULT_VALUES = {
  image: "",
  name: "",
  email: "",
  phone: "",
  age: "",
  password: "",
  is_freelance: false,
  country_id: "",
  job_title: "",
  categories: [],
  skills: [],
};

export const getSchema = (t) => {
  return yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    age: yup
      .date()
      .typeError("Date of birth must be a valid date")
      .required("Date of birth is required"),
    country_id: yup.string().required("Country is required"),
    phone: yup.string().required("Phone number is required"),
    phone_code: yup.string().required("Phone code is required"),
    image: yup
      .mixed()
      .required("Image is required")
      .test(
        "file-type",
        "Unsupported File Format",
        (value) => value instanceof File && value.type?.startsWith("image/")
      ),
    job_title: yup.string().required("Job title is required"),
    is_freelance: yup.boolean().required("Freelance status is required"),
    categories: yup
      .array()
      .min(1, "At least one category is required")
      .required("Categories are required"),
    skills: yup
      .array()
      .min(1, "At least one skill is required")
      .required("Skills are required"),
  });
};

export default function useRegisterForm() {
  const { t } = useTranslation();
  const methods = useForm({
    defaultValues: REGISTRATION_FORM_DEFAULT_VALUES,
    resolver: yupResolver(getSchema(t)),
    mode: "onChange",
  });
  return methods;
}
