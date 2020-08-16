import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  const [toShow, setToShow] = useState("All");

  const onSelectedIndexChange = (e) => {
    setToShow(e.target.value);
  };

  const uniq = [...new Set(posts.map((post) => post.category))];
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Shopping</h1>
      <p className="lead text-swifter">Welcome to the Shop Page</p>
      <div>
        <select
          name="category"
          id="category"
          onChange={(e) => onSelectedIndexChange(e)}
        >
          <option value="All">All</option>
          {uniq.map((un) => (
            <option key={un} value={un}>
              {un}
            </option>
          ))}
        </select>
      </div>

      <div className="posts">
        {posts.map(
          (post) =>
            post.amount > 0 &&
            (toShow == "All" || post.category == toShow) && (
              <PostItem key={post._id} post={post} />
            )
        )}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.posts,
});
export default connect(mapStateToProps, { getPosts })(Posts);
