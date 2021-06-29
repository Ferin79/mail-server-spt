import axios from "axios";
export const API = process.env.REACT_APP_API || "http://localhost:4000";

const getAccessToken = () => {
  const { accessToken } = JSON.parse(localStorage.getItem("userData") || "[]");
  return accessToken;
};

const headerWithoutToken = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const LoginApi = (email, password) => {
  const data = {
    email,
    password,
  };
  return axios.post(API + "/user/login", data, {
    headers: headerWithoutToken,
  });
};

export const RegisterApi = (email, password) => {
  const data = {
    email,
    password,
  };
  return axios.post(API + "/user/register", data, {
    headers: headerWithoutToken,
  });
};

export const GetProjects = () => {
  return axios.get(API + "/project", {
    headers: {
      ...headerWithoutToken,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

export const CreateProjects = (
  name,
  description,
  sendGrid,
  sendGridVerifiedEmail
) => {
  const data = {
    name,
    description,
    sendGrid,
    sendGridVerifiedEmail,
  };
  return axios.post(API + "/project", data, {
    headers: {
      ...headerWithoutToken,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

export const UpdateProjects = (
  id,
  name,
  description,
  sendGrid,
  sendGridVerifiedEmail
) => {
  const data = {
    name,
    description,
    sendGrid,
    sendGridVerifiedEmail,
  };
  return axios.patch(API + "/project/" + id, data, {
    headers: {
      ...headerWithoutToken,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

export const DeleteProjects = (id) => {
  return axios.delete(API + "/project/" + id, {
    headers: {
      ...headerWithoutToken,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

export const MailsByProjectId = (id) => {
  return axios.get(API + "/mail/" + id, {
    headers: {
      ...headerWithoutToken,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

export const DashboardInfo = () => {
  return axios.get(API + "/project/dashboard", {
    headers: {
      ...headerWithoutToken,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};
