import React from "react";
import PropTypes from "prop-types";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import ArticleFeeds from "../components/ArticleFeeds/ArticleFeeds";
import ArticlePage from "../components/ArticlePage/ArticlePage";

export let history = createBrowserHistory();

const AppRouter = (props) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact={true} path="/">
          <ArticleFeeds client={props.client} />
        </Route>
        <Route to="/article/:id" children={<ArticlePage />}></Route>
      </Switch>
    </Router>
  );
};

AppRouter.propTypes = {
  client : PropTypes.object
};

export default AppRouter;
