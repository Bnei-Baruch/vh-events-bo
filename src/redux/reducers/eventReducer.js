import { createReducer } from "redux-act";
import { setEventList } from "../actions/eventActions";

const initialState = {
  events: undefined,
};

export default createReducer(
  {
    [setEventList]: (state, action) => {
      return { ...state, events: action.event };
    },
  },
  initialState
);
