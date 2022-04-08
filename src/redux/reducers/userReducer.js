import { createReducer } from "redux-act";
import {
  setLoggedInUser,
  setFirstName,
  setLastName,
  setKeycloakData,
  setUserProfileDetails,
  updateUserStatus,
} from "../actions/userActions";

const initialState = {
  info: {},
};

export default createReducer(
  {
    [setLoggedInUser]: (state, action) => {
      return { ...state, info: action.user };
    },
    [setFirstName]: (state, action) => {
      return { ...state, info: action.user };
    },
    [setLastName]: (state, action) => {
      return { ...state, info: action.user };
    },
    [setKeycloakData]: (state, action) => {
      return { ...state, keycloak: action.keycloak };
    },
    [setUserProfileDetails]: (state, action) => {
      return { ...state, userDetails: action.value };
    },
    [updateUserStatus]: (state, action) => {  // eslint-disable-line
      return { ...state, userStatus: action.value };
    }
  },
  initialState
);
