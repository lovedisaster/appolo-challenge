const { RESTDataSource } = require('apollo-datasource-rest');

class SportDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://interview-backend.theathletic.com/';
  }
}

exports.SportDataSource = SportDataSource;
