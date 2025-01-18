import axiosInstance from "./../utils/axios";

export default async function getProfile(id) {
  const res = await axiosInstance.post(`/get_profile?id=${id}`);
  console.log(res.headers);
  try {
    // const res = await axiosInstance.post(`/get_profile?id=${id}`);
    console.log(res.headers);
    if (res.data.code === 200) {
      console.log(res.headers);

      return res.data.data;
    } else {
      throw new Error(res.data.message || "Error fetching profile");
    }
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    throw error;
  }
}
