import axios from "../utils/axios";

export async function getCategories() {
  try {
    const req = await axios.get("/get_categories");
    console.log(req);

    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
getCategories();
export async function getGategoriesWithSubcategories() {
  try {
    const req = await axios.get("/get_categories_with_subcategory");

    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getPopularCategories() {
  try {
    const req = await axios.get("/get_popular_categories");
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
export async function getSubCategories(categoryId) {
  try {
    const req = await axios.post("/get_sub_categories", {
      id: categoryId,
    });
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getCategory(id) {
  try {
    const req = await axios.get(`/get_category/${id}`);
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
