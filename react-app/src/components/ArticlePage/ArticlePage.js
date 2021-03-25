import React from "react";
import PropTypes from "prop-types";
import { StateContext } from "../../App";
import "./ArticleFeeds.css";
const ArticlePage = () => {
  return (
    <StateContext.Consumer>
      {(context) => {
        return context.state.article ? (
          <div className="container">
            <div className="row">
              <a className="back-button" href="/">
                Back
              </a>
            </div>
            <div className="row">
              <img
                className="left"
                src={context.state.article.imageUrlString}
                alt={context.state.article.title}
              />
              <h1 className="right">{context.state.article.title}</h1>
            </div>
            <p>{context.state.article.body}</p>
          </div>
        ) : (
          <div>No result found</div>
        );
      }}
    </StateContext.Consumer>
  );
};

ArticlePage.propTypes = {
  state: PropTypes.object,
};

export default ArticlePage;
