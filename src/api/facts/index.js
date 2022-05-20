const FactsHandler = require('./handler')
const routes = require('./routes')

module.exports = {
  name: 'facts',
  version: '1.0.0',
  register: async (server, {
    databaseService
  }) => {
    const factsHandler = FactsHandler(
      databaseService
    )
    server.route(routes(factsHandler))
  }
}
