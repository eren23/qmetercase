import {
  ADD_BASKET,
  BASKET_ERROR,
  MAKE_BASKET,
  MAKE_ERROR,
  REMOVE_ITEM,
  REMOVE_ERROR,
  COMPLETE_PURCHASE,
} from "../actions/types";
// import posts from "./posts";
// import { post } from "request";

const initialState = {
  posts: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  // console.log(payload);
  switch (type) {
    case ADD_BASKET:
      return {
        ...state,
        posts: [payload[0]],
        loading: false,
      };

    case BASKET_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case MAKE_BASKET:
      return {
        ...state,
        posts: payload,
        loading: false,
      };

    case MAKE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case REMOVE_ITEM:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.warehousenumber === payload[1]
            ? {
                ...post,
                amount: payload[0],
              }
            : post
        ),
      };
    case COMPLETE_PURCHASE:
      return {
        posts: [],
        loading: false,
        error: {},
      };

    default:
      return state;
  }
}
