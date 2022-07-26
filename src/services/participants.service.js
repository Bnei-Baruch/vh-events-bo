import axios from "axios";

const getParticipants = (query, limit = 10, skip) => {
  // eslint-disable-next-line
  return axios
    .get(
      `${window.APP_CONFIG.VH_API_BASE_URL}/events/v1/participation-statuses${
        query
          ? `?${query}` + `&limit=${limit}&skip=${skip}`
          : `?limit=${limit}&skip=${skip}`
      }`
    )
    .then((res) => res.data);
};

export const downloadParticipantCSV = (query, limit = 10, skip) => {
  return axios
    .get(
      `${window.APP_CONFIG.VH_API_BASE_URL}/events/v1/participation-statuses${
        query
          ? `?${query}` + `&limit=${limit}&skip=${skip}&csv=true`
          : `?limit=${limit}&skip=${skip}&csv=true`
      }`
    )
    .then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "participant.csv");
      document.body.appendChild(link);
      link.click();
    });
};

export const updateParticipantStatus = (id, data) => {
  return axios
    .patch(
      `${window.APP_CONFIG.VH_API_BASE_URL}/events/v1/participation-status/${id}`,
      data
    )
    .then((res) => res.data);
};

export const deletePariticpant = (id) => {
  return axios
    .delete(
      `${window.APP_CONFIG.VH_API_BASE_URL}/events/v1/participation-status/${id}`
    )
    .then((res) => res.data);
};

export default getParticipants;
