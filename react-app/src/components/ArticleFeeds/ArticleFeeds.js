import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";

import "./ArticleFeeds.css";

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

const GET_FEEDS = gql`
    query {
        articles(args: $args){
        id
        title
        body
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
`;

const ArticleFeeds = (props) => {
  const { data, loading } = useQuery(GET_TEAMS);
  const [ getFeeds, {data: dataA, loading: loadingA } ] = useLazyQuery(GET_FEEDS);
 
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
              data.teams.map((team) => (
                <li className="teams__list__item" key={team.id}>
                  <span
                    onClick={() => {
                      getFeeds({variables: {args: ["teams", team.id]}});
                    }}
                    className="teams__list__item-left"
                  >
                    {team.name}
                  </span>
                  <span
                    onClick={() => {
                        getFeeds({variables: {args: ["leagues", team.league.id]}});
                    }}
                    className="teams__list__item-right"
                  >
                    {team.league.title}
                  </span>
                </li>
              ))}
          </ul>
        )}
      </section>
      <section className="feeds">
        <h1 className="heading">Feeds</h1>
        {/* {   
            loadingA ? <div>Loading</div> : <div> 
                {dataA && dataA.articles.map(a => <div>{a.title}</div>)}
            </div>
        } */}
      </section>
    </div>
  );
};

ArticleFeeds.propTypes = {};

export default ArticleFeeds;
