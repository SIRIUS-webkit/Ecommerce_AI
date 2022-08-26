import { UPDATE_CARTITEM } from "./types";

const initialState = [];

const cartDatas = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CARTITEM:
      return action.data;
    default:
      return state;
  }
};

export default cartDatas;
