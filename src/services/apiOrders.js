import axios from "../utils/axios";

export async function getServiceOrders({ page, status }) {
  const requestBody = {};
  if (page) requestBody.page = page;
  if (status) requestBody.status = status;
  try {
    const req = await axios.post("/user/get_my_service_orders", requestBody);
    return {
      data: req.data.data,
      total: req.data.total,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function createOrder(queryClient) {
  try {
    await axios.post("/user/create_service_order");
    queryClient.invalidateQueries("cartList");
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getOrder(id) {
  try {
    const req = await axios.post("/user/get_service_order_details", {
      id: id,
    });
    return req.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateOrder(id, status, queryClient) {
  try {
    await axios.post("/user/update_service_order", {
      id: id,
      status: status,
    });
    queryClient.invalidateQueries("order");
    queryClient.invalidateQueries("serviceOrdersList");
    queryClient.invalidateQueries("purchasesList");
  } catch (error) {
    throw new Error(error.message);
  }
}
