import { createAction } from "redux-act";
import { SET_EVENTS_LIST, SET_SELECTED_EVENT_ID } from "../constants";

export const setEventList = createAction(SET_EVENTS_LIST, (event) => ({
  event,
}));

export const setSelectedEventId = createAction(
  SET_SELECTED_EVENT_ID,
  (event) => {
    localStorage.setItem("eventId", event);
    return {
      event,
    };
  }
);
