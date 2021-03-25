import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import "./ArticleFeeds.css";
import ActionTypes from "../../actions/ActionTypes";
import { createBrowserHistory } from "history";
import { StateContext } from "../../App";
import moment from "moment";

let history = createBrowserHistory();

const GET_TEAMS = gql`
  query {
    teams {
      id
      createdAt
      name
      league {
        id
        title
      }
    }
  }
`;

const ArticleFeeds = ({ state, dispatch, client }) => {
  const { data, loading } = useQuery(GET_TEAMS);
  let [articlesFeeds, setArticlesFeeds] = useState(null);
  let [feedsLoading, setFeedsLoading] = useState(false);
  let [currentIndex, setCurrentIndex] = useState(0);
  let [currentFeedIndex, setCurrentFeedIndex] = useState(0);

  const getFeeds = (args) => {
    setFeedsLoading(true);
    client
      .query({
        query: gql`
          query{
            articles(args: ${JSON.stringify(args)}){
            id
            title
            body
            imageUrlString
            updatedAt
            createdAt
            team{
                id
            }
            league{
                id
            }
            }
          }
       `,
      })
      .then((result) => {
        if (!result.loading) {
          setFeedsLoading(false);
          setArticlesFeeds(result.data.articles);
        }
      })
      .catch((e) => console.log("Handle erros here"));
  };

  const GoToArticlePage = (article, path, dispatch) => {
    dispatch({
      type: ActionTypes.SET_ARTICLE,
      payload: article,
    });
    history.replace(path);
  };

  return (
    <div className="two-col">
      <section className="teams">
        <h1 className="heading">Teams</h1>
        {loading ? (
          <p>Loading</p>
        ) : (
          <ul className="teams__list">
            <li className="teams__list__item teams__list__item-header">
              <span className="teams__list__item-left">Team</span>
              <span className="teams__list__item-right">League</span>
            </li>
            {data &&
              data.teams.slice(currentIndex, currentIndex + 10).map((team) => (
                <li className="teams__list__item" key={team.id}>
                  <span
                    onClick={() => {
                      getFeeds(["teams", team.id]);
                    }}
                    className="teams__list__item-left"
                  >
                    {team.name}
                  </span>
                  <span
                    onClick={() => {
                      getFeeds(["leagues", team.league.id]);
                    }}
                    className="teams__list__item-right"
                  >
                    {team.league.title}
                  </span>
                </li>
              ))}
            <li className="teams__list__item teams__list__item-header">
              {currentIndex > 0 && (
                <span
                  onClick={() => {
                    setCurrentIndex(currentIndex - 10);
                  }}
                  className="teams__list__item-left"
                >
                  Pre
                </span>
              )}
              {currentIndex < data.teams.length - 9 && (
                <span
                  onClick={() => {
                    setCurrentIndex(currentIndex + 10);
                  }}
                  className="teams__list__item-right"
                >
                  Next
                </span>
              )}
            </li>
          </ul>
        )}
      </section>
      <section className="feeds">
        <h1 className="heading">Article Feeds</h1>
        {feedsLoading ? (
          <div className="loading">Loading</div>
        ) : (
          <StateContext.Consumer>
            {(context) => {
              return (
                <div className="feeds__list">
                  {articlesFeeds && <div className="feeds__pagination">
                    {currentFeedIndex > 0 && (
                      <span
                        onClick={() => {
                          setCurrentFeedIndex(currentFeedIndex - 4);
                        }}
                        className="feeds__list-item-left"
                      >
                        Pre
                      </span>
                    )}
                    {currentFeedIndex < articlesFeeds.length - 3 && (
                      <span
                        onClick={() => {
                          setCurrentFeedIndex(currentFeedIndex + 4);
                        }}
                        className="feeds__list-item-right"
                      >
                        Next
                      </span>
                    )}
                  </div>
                  }
                  {articlesFeeds ? (
                    articlesFeeds
                      .slice(currentFeedIndex, currentFeedIndex + 4)
                      .map((a) => (
                        <div key={a.title} className="feeds__list__item">
                          <img
                            className="item-img"
                            src={a.imageUrlString}
                            alt={`img${a.title}`}
                          />
                          <span className="item-contents">
                            <h4
                              onClick={() => {
                                GoToArticlePage(
                                  a,
                                  `/article/${a.id}`,
                                  context.dispatch
                                );
                              }}
                              className="title"
                            >
                              <Link to="/article">{a.title}</Link>
                            </h4>

                            <small className="">
                              Last updated at : <b>{moment(a.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</b>
                            </small>
                          </span>
                        </div>
                      ))
                  ) : (
                    <div>
                      Please select your favorate team or league for articles.
                    </div>
                  )}
                </div>
              );
            }}
          </StateContext.Consumer>
        )}
      </section>
    </div>
  );
};

ArticleFeeds.propTypes = {};

export default ArticleFeeds;
