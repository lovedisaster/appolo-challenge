const NodeCache = require( "node-cache" );
const myCache = new NodeCache( { stdTTL: 0, checkperiod: 604800 } );


const resolvers = {
  Query: {
    async leagues(_root, _args, { dataSources }) {
      return dataSources.leagueDataSource.getLeagues();
    },
    async teams(_root, _args, { dataSources }) {
      var teamsCache = myCache.get("teams");
      if(teamsCache) {
        return teamsCache;
      }else{
        return dataSources.teamDataSource
        .getTeams()
        .then(teams => {
          myCache.set("teams", teams, 0);
          return teams;
        });
      }
    },
    async articles(_root, _args, { dataSources }) {
      return dataSources.articleDataSource
        .getArticles(_args.args[0], _args.args[1])
        .then(articles => articles.sort((a, b) => {return new Date(a.updatedAt) - new Date(b.updatedAt)}));
    }
  },
  Team: {
    async league(source, _fields, { dataSources }) {
      return dataSources.leagueDataSource.getLeague(source.league.id);
    }
  }
};

module.exports = resolvers;
