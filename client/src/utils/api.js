import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "http://localhost:3001/api/v1",
});

/// from here on words all the api calls are of Task
//.................................................

export const getAllTasks = async (email, token) => {
  if (!token) return;

  try {
    const response = await api.post(
      "/task/alltask",
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      {
        timeout: 10 * 1000,
      }
    );

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

//toFav function
export const toFavTask = async (id, email, token) => {
  try {
    api.post(
      `/usert/toFavTask/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    throw err;
  }
};

export const getAllFavTask = async (email, token) => {
  if (!token) return;

  try {
    const res = await api.post(
      `/usert/allFav`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data["favTasks"];
  } catch (err) {
    toast.error("Error occured while fetching favourites");
    throw err;
  }
};

export const createUsert = async (email, token) => {
  try {
    await api.post(
      "/usert/register",
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, please try again later");
    throw error;
  }
};

//toFav function
export const deleteTask = async (id, token) => {
  try {
    api.delete(
      `/task/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    throw err;
  }
};

export const getTaskIDs = async (email, token) => {
  if (!token) return;
  try {
    const res = await api.post(
      "/task/task-ids",
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    toast.error("Something went wrong, please try again later");
    throw error;
  }
};
export const getTask = async (id, token) => {
  if (!token) return;

  try {
    const response = await api.get(
      `/task/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      {
        timeout: 10 * 1000,
      }
    );

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const createTask = async (data, token) => {
  if(!token) return
  try {
    const res = await api.post(
      `/task/create`,
      {
        data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (id, data, token) => {
  // console.log(data, "id  ", id , token)

  try {
    const res = await api.put(
      `task/${id}`,
      {
        data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};
