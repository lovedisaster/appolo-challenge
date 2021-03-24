# apollo-server

The Apollo Server is a simple, Express-based implementation of Apollo Server (https://www.apollographql.com/docs/apollo-server/), a spec-compliant GraphQL server that can be used with any compatible GraphQL client.

Simply install the node_modules (we use Yarn) and start the server.

The GraphQL playground can be access via http://localhost:4000/graphql where you can inspect the current schema, and execute queries.

## Endpoints

The Apollo Server uses a few REST based endpoints for retrieving teams and leagues, however there are additonal endpoints available to help satisfy future requirements this server made need to provide.

### Teams

#### GET /teams

List all teams

```
curl "https://mobile-interview-backend.theathletic.com/teams"
```

#### GET /teams/[team_id]

Get single team

```
curl "https://mobile-interview-backend.theathletic.com/teams/04DDC2D1-6752-4173-8217-BA8326D6CDB7"
```

#### GET /teams/[team_id]/articles

List all articles for a team

```
curl "https://mobile-interview-backend.theathletic.com/teams/04DDC2D1-6752-4173-8217-BA8326D6CDB7/articles"
```

### Leagues

#### GET /leagues

List all leagues

```
curl "https://mobile-interview-backend.theathletic.com/leagues"
```

#### GET /leagues/[league_id]

Get single league

```
curl "https://mobile-interview-backend.theathletic.com/leagues/8D59D789-49A3-43F0-86B5-23166ACBDC15"
```

#### GET /leagues/[league_id]/articles

List all articles for a league

```
curl "https://mobile-interview-backend.theathletic.com/leagues/8D59D789-49A3-43F0-86B5-23166ACBDC15/articles"
```

### Articles

#### GET /articles

List all articles

```
curl "https://mobile-interview-backend.theathletic.com/articles"
```

#### POST /articles

Create a new article

```
curl -X "POST" "https://mobile-interview-backend.theathletic.com/articles" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "body": "Article Body",
  "teamId": "<UUID>",
  "title": "A wonderful story",
  "imageUrlString": "https://temp.jp",
  "leagueId": "<UUID>",
  "authorId": "<UUID>"
}'
```

#### GET /articles/[article_id]

Get Newly created article

```
curl "https://mobile-interview-backend.theathletic.com/articles/06CFBBFF-3255-4812-BA92-70716480A812"
```

### Authors

#### GET /authors

List all Authors

```
curl "https://mobile-interview-backend.theathletic.com/authors"
```

#### GET /authors/[author_id]

Get single author

```
curl "https://mobile-interview-backend.theathletic.com/authors/CD14297E-ABC0-47B5-AEF7-77803E0BCE36"
```

#### POST /authors

Create Author

```
curl -X "POST" "https://mobile-interview-backend.theathletic.com/authors" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "body": "Article Body",
  "imageUrlString": "http://test.jpg",
  "title": "Tech Lead Manager (iOS)",
  "name": "Kyle Browning",
  "shortname": "Kyle"
}'
```
