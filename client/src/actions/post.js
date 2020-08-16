import axios from "axios";
import {
  GET_PRODUCTS,
  PRODUCTS_ERROR,
  ADD_BASKET,
  BASKET_ERROR,
} from "./types";
import { setAlert } from "./alert";

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/product/");
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add item to the basket
export const addBasket = (id, size) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/product/${id}`);

    dispatch({
      type: ADD_BASKET,
      payload: [res.data.basket, size, id],
    });

    dispatch(setAlert("Item Added to the Basket", "success", 2000));
  } catch (err) {
    console.log(err);
    dispatch({
      type: BASKET_ERROR,
      payload: { deneme: "Error occured" },
    });
  }
};
