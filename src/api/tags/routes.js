const routes = (handler) => [
  {
    method: 'GET',
    path: '/tag/get/$fact_id',
    handler: handler.getTagsByFactHandler
  },
  {
    method: 'GET',
    path: '/tag/get/$tag_id',
    handler: handler.getTagsByTagHandler
  },
  {
    method: 'POST',
    path: '/tag/',
    handler: handler.addTagHandler
  },
  {
    method: 'PUT',
    path: '/tag/update/$id',
    handler: handler.updateTagHandler
  },
  {
    method: 'DELETE',
    path: '/tag/delete/$fact_id',
    handler: handler.deleteTagHandler
  }
]

module.exports = routes
