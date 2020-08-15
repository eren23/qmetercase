import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import posts from "./posts";
import basket from "./basket";

export default combineReducers({
  alert,
  auth,
  posts,
  basket,
});
