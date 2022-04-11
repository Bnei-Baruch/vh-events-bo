import axios from "axios";
import {
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILED,
} from "../constants";

export const fetchProfile = () => {
  return (dispatch, getState) => {
    const { subject, token } = getState().userReducer.info.keycloak;

    return axios
      .get(`${window.APP_CONFIG.VH_API_BASE_URL}/profile/v1/profile/${subject}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(
        ({ data }) => dispatch({ type: FETCH_PROFILE_SUCCESS, payload: data }),
        ({ message, response }) => {
          if (response && response.status === 404) {
            return null;
          } else {
            dispatch({ type: FETCH_PROFILE_FAILED, payload: message });
          }
        }
      );
  };
};
