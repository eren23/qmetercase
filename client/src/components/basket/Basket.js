import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBasket } from "../../actions/basket";
import { completePurchase } from "../../actions/basket";
import Spinner from "../layout/Spinner";
import PostItem from "./BasketItem";

const Posts = ({ completePurchase, getBasket, basket: { posts, loading } }) => {
  useEffect(() => {
    getBasket();
  }, [getBasket]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Basket</h1>
      <p className="lead text-swifter">Your Items are Listed Below</p>
      <div className="posts">
        {posts.map(
          (post) => post.amount > 0 && <PostItem key={post._id} post={post} />
        )}
      </div>

      <button
        onClick={async () => {
          completePurchase();
        }}
        type="button"
        className="btn btn-success"
      >
        <i className="fa fa-check" aria-hidden="true"></i>
        <span>
          {" "}
          <span className="comment-count">Complete Purchase Button</span>
        </span>
      </button>
    </Fragment>
  );
};

Posts.propTypes = {
  getBasket: PropTypes.func.isRequired,
  completePurchase: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  basket: state.basket,
});
export default connect(mapStateToProps, { getBasket, completePurchase })(Posts);
