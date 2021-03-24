const { SportDataSource } = require('./sportDataSource');

class TeamDataSource extends SportDataSource {
  constructor() {
    super();
  }

  async getTeam(id) {
    return this.get(`teams/${id}`);
  }

  async getTeams() {
    return this.get(`teams`);
  }
}

exports.TeamDataSource = TeamDataSource;
