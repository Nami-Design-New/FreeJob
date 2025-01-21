import axios from "../utils/axios";

export async function getCollections() {
  try {
    const req = await axios.post("/user/get_collections");
    return req.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCollection(id) {
  try {
    const req = await axios.post("user/get_collection_details_with_services", {
      id
    });
    return {
      data: req.data.data,
      count: req.data.count
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addToCollection(requestBody, querClient) {
  try {
    const req = await axios.post("/user/add_to_collection", requestBody);
    querClient.invalidateQueries("cartList");
    return req.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function removeCollection(requestBody, querClient) {
  try {
    await axios.post("/user/delete_collection", {
      id: requestBody
    });
    querClient.invalidateQueries(["collectionsList"]);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateCollection(requestBody, querClient) {
  try {
    await axios.post("/user/update_collection", requestBody);
    querClient.invalidateQueries(["collectionsList"]);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addCollectionToCart(id, queryClient) {
  try {
    const req = await axios.post("/user/add_collection_to_cart", {
      id: id
    });
    queryClient.invalidateQueries(["cartList"]);
    return req.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
