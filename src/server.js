'use strict'

// dotenv
require('dotenv').config()

// Facts API
const facts = require('./api/facts')

// Database Service
const FactService = require('./services/FactService')

const Hapi = require('@hapi/hapi')

const init = async () => {
  const factService = new FactService()

  const server = Hapi.server({
    port: process.env.SERVER_PORT,
    host: process.env.SERVER_HOST,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  await server.register({
    plugin: facts,
    option: {
      service: factService
    }
  })

  await server.start()
  console.log('Server is running on %s', server.info.uri)
}

init()
