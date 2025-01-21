import axiosInstance from "../utils/axios";

export async function deleteAccount() {
  try {
    const req = await axiosInstance.post("/user/delete_account");
    return req.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
