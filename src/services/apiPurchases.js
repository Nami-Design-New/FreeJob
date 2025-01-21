import axios from "../utils/axios";

export async function getPurchasesOrders({ page, status }) {
  const requestBody = {};
  if (page) requestBody.page = page;
  if (status) requestBody.status = status;
  try {
    const req = await axios.post(
      "user/get_my_purchase_service_orders",
      requestBody
    );
    return {
      data: req.data.data,
      total: req.data.total
    };
  } catch (err) {
    throw new Error(err.message);
  }
}
