const routes = (handler) => [
  {
    method: 'GET',
    path: '/tag/$fact_id',
    handler: handler.getTagsByFactHandler
  }
  // TODO create more endpoints for tagging
]

module.exports = routes
