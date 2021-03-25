import ActionTypes from "../actions/ActionTypes";
import {cloneDeep} from "lodash";

const Reducer = (state, action) => {
  let newState = cloneDeep(state);

  switch (action.type) {
    case ActionTypes.SET_ARTICLE:
      newState.article = action.payload;
      return newState;
    
    default:
      return newState;
  }
};

export default Reducer;
