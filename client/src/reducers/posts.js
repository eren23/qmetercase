import { GET_PRODUCTS, PRODUCTS_ERROR, ADD_BASKET } from "../actions/types";

const initialState = {
  posts: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };

    case PRODUCTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case ADD_BASKET:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.warehousenumber === payload[2]
            ? {
                ...post,
                amount: payload[1],
              }
            : post
        ),
      };

    default:
      return state;
  }
}
