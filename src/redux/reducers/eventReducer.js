import { createReducer } from "redux-act";
import { setEventList, setSelectedEventId } from "../actions/eventActions";

const initialState = {
  events: undefined,
  eventId: undefined,
};

export default createReducer(
  {
    [setEventList]: (state, action) => {
      return { ...state, events: action.event };
    },
    [setSelectedEventId]: (state, action) => {
      return { ...state, eventId: action.event };
    },
  },
  initialState
);
