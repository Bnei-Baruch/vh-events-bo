import { createAction } from "redux-act";
import { SET_EVENTS_LIST } from "../constants";

export const setEventList = createAction(SET_EVENTS_LIST, (event) => ({
    event,
}));
