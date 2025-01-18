import axiosInstance from "./../utils/axios";

export default async function getSettings() {
  try {
    const response = await axiosInstance.get("/get_settings");
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
