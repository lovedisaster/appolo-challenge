const resolvers = {
  Query: {
    async leagues(_root, _args, { dataSources }) {
      return dataSources.leagueDataSource.getLeagues();
    },
    async teams(_root, _args, { dataSources }) {
      return dataSources.teamDataSource.getTeams();
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
