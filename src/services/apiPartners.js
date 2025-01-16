import axiosInstance from "../utils/axios";

export async function getParteners() {
  try {
    const req = await axiosInstance.get("/get_partners");

    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
// getParteners();
