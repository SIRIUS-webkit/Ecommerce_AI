import { combineReducers } from "redux";
import loading from "./loading";
import cartDatas from "./cartDatas";

const appReducer = combineReducers({ loading, cartDatas });
const rootReducer = (state, action) => {
  let newState = state;

  //   if (action.type === HYDRATE) {
  //     const nextState = {
  //       ...state,
  //       ...action.data,
  //     };

  //     return nextState;
  //   }

  return appReducer(newState, action);
};

export default rootReducer;
