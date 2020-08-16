import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { addLike, removeLike, deletePost } from "../../actions/post";
import { removeBasket } from "../../actions/basket";
const PostItem = ({
  post: { productname, warehousenumber, amount, category, text, price },
  removeBasket,
}) => {
  return (
    <div className="post bg-white p-1 my-1 rounder-4">
      <div>
        <p className="my-1 lead">{productname}</p>
        <p className="my-1">
          <strong>Category: {category}</strong>
        </p>

        <Fragment>
          <button type="button" className="btn btn-light">
            <span>
              {amount > 0 && <span className="comment-count">{price}$</span>}
            </span>
          </button>
          <button
            onClick={(e) => {
              //aconsole.log("basketitemsize", amount);
              amount--;
              removeBasket(warehousenumber, amount);
            }}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times"></i>
          </button>
        </Fragment>
      </div>
      <p className="my-1">
        <strong>Product Descripton: </strong>
        {text}
        <br /> <br />
        <i>Item Amount:{amount}</i>
      </p>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  removeBasket: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { removeBasket })(PostItem);
