import axiosInstance from "./../utils/axios";

export async function getWorks(userId) {
  try {
    const req = await axiosInstance.post("/get_works", {
      id: userId,
    });
    return req.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getWork(workId) {
  try {
    const req = await axiosInstance.post("/get_work_details", {
      title: workId,
    });
    return req.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addWork(data, queryClient) {
  try {
    await axiosInstance.post("/user/create_works", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    queryClient.invalidateQueries(["userWorks"]);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateWork(data, queryClient) {
  try {
    await axiosInstance.post("/user/update_works", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    queryClient.invalidateQueries(["userWorks"]);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteWork(id, queryClient) {
  try {
    await axiosInstance.post("/user/delete_works", {
      id,
    });
    queryClient.invalidateQueries(["userWorks"]);
  } catch (error) {
    throw new Error(error.message);
  }
}
