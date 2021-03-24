const { SportDataSource } = require('./sportDataSource');

class ArticleDataSource extends SportDataSource {
  constructor() {
    super();
  }

  async getArticles(type, id) {
    return this.get(`${type}/${id}/articles`);
  }
}

exports.ArticleDataSource = ArticleDataSource;