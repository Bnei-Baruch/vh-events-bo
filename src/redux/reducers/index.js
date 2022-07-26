import { combineReducers } from "redux";

import themeReducer from "./themeReducers";
import profileReducer from "./profileReducers";
import settingsReducer from "./settingsReducers";
import userReducer from "./userReducer";
import eventReducer from "./eventReducer";
export default combineReducers({
  themeReducer,
  profileReducer,
  settingsReducer,
  userReducer,
  eventReducer
});
