import axios from "../utils/axios";

export async function getBlogs() {
  try {
    const req = await axios.get("/get_last_news");
    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getBlogDetails(id) {
  try {
    const req = await axios.post(`/get_last_news_data`, {
      id,
    });

    return req.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
