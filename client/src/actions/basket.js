import axios from "axios";
import {
  MAKE_BASKET,
  MAKE_ERROR,
  REMOVE_ITEM,
  REMOVE_ERROR,
  COMPLETE_PURCHASE,
  PURCHASE_ERROR,
} from "./types";
import { setAlert } from "./alert";

//Fill basket
export const getBasket = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/product/me");
    dispatch({
      type: MAKE_BASKET,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MAKE_ERROR,
    });
  }
};

//Remove Item from the Basket
export const removeBasket = (id, size) => async (dispatch) => {
  try {
    await axios.post(`/api/product/basket/${id}`);

    dispatch({
      type: REMOVE_ITEM,
      payload: [size, id],
    });
  } catch (err) {
    dispatch({
      type: REMOVE_ERROR,
    });
  }
};

//Complete the Purchase
export const completePurchase = () => async (dispatch) => {
  try {
    await axios.get("/api/product/purchase/");
    dispatch({
      type: COMPLETE_PURCHASE,
    });
    dispatch(setAlert("Your Purchase is Succesfull", "success", 5000));
  } catch (err) {
    dispatch({
      type: PURCHASE_ERROR,
    });
  }
};
