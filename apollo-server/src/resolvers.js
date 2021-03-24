const resolvers = {
  Query: {
    async leagues(_root, _args, { dataSources }) {
      return dataSources.leagueDataSource.getLeagues();
    },
    async teams(_root, _args, { dataSources }) {
      return dataSources.teamDataSource.getTeams();
    },
  },
  Team: {
    async league(source, _fields, { dataSources }) {
      return dataSources.leagueDataSource.getLeague(source.league.id);
    },
  },
};

module.exports = resolvers;
