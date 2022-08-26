import { UPDATE_CARTITEM } from "../types";

// dispatch function user data
const cartDatas = (data) => (dispatch) => {
  dispatch({
    type: UPDATE_CARTITEM,
    data,
  });
};

export default cartDatas;
