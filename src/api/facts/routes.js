const routes = (handler) => [
  {
    method: 'GET',
    path: '/',
    handler: handler.homePageHandler
  },
  {
    method: 'GET',
    path: '/random',
    handler: handler.randomFactHandler
  },
  {
    method: 'PUT',
    path: '/updatingnewfactletsgooo/{id}',
    handler: handler.updateFactHandler
  },
  {
    method: 'POST',
    path: '/insertnewfactsletsgooo',
    handler: handler.postNewFactHandler
  },
  {
    method: 'DELETE',
    path: '/deletingfactdamnsadge/{id}',
    handler: 'handler.deleteFactHandler'
  },
  {
    method: 'GET',
    path: '/getexactfact/{id}',
    handler: 'handler.exactFactHandler'
  }
]

module.exports = routes
