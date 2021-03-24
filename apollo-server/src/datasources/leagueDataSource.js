const { SportDataSource } = require('./sportDataSource');

class LeagueDataSource extends SportDataSource {
  constructor() {
    super();
  }

  async getLeague(id) {
    return this.get(`leagues/${id}`);
  }

  async getLeagues() {
    return this.get(`leagues`);
  }
}

exports.LeagueDataSource = LeagueDataSource;
