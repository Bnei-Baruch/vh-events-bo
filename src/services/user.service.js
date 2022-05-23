import axios from "axios";

export const getUserDetails = (keycloakId) =>
  axios
    .get(
      `${window.APP_CONFIG.VH_API_BASE_URL}/profile/v1/profile/${keycloakId}`
    )
    .then((res) => res?.data);

export const postUserStatus = (keycloakId, email) =>
  axios
    .post(
      `${window.APP_CONFIG.VH_API_BASE_URL}/register/status/kc/${keycloakId}`,
      {
        email,
      }
    )
    .then((res) => res?.data);

export const getMembershipStatus = (email) => {
  return axios
    .get(`${window.APP_CONFIG.VH_API_BASE_URL}/pay/status/${email}`)
    .then((res) => res.data);
};
