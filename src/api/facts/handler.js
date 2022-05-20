const ClientError = require('../../exceptions/ClientError')

class FactsHandler {
  constructor (factService) {
    this._factService = factService
  }

  async homePageHandler (request, h) {
    try {

      // TODO: create homepage handler

    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'failed',
          message: error.message
        })
        response.code(error.statusCode)
        return response
      }
      // server error
      const response = h.response({
        status: 'fail',
        message: 'Internal Server Error'
      })
      response.code(500)
      console.error(error)
      return response
    }
  }

  async randomFactHandler (request, h) {
    try {
      const fact = await this._factService.getRandomFact()
      return {
        status: 'success',
        message: 'successfully find random fact!',
        data: {
          fact
        }
      }
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'failed',
          message: error.message
        })
        response.code(error.statusCode)
        return response
      }
      // server error
      const response = h.response({
        status: 'fail',
        message: 'Internal Server Error'
      })
      response.code(500)
      console.error(error)
      return response
    }
  }

  async exactFactHandler (request, h) {
    try {
      const { id } = request.params
      const fact = await this._factService.getFactById({ id })
      return {
        status: 'success',
        message: 'successfully find exact fact!',
        data: {
          fact
        }
      }
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'failed',
          message: error.message
        })
        response.code(error.statusCode)
        return response
      }
      // server error
      const response = h.response({
        status: 'fail',
        message: 'Internal Server Error'
      })
      response.code(500)
      console.error(error)
      return response
    }
  }

  async updateFactHandler (request, h) {
    try {
      const { id } = request.params
      const fact = request.payload
      await this._factService.updateFact(id, fact)
      return {
        status: 'success',
        message: 'Fact updated!'
      }
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'failed',
          message: error.message
        })
        response.code(error.statusCode)
        return response
      }
      // server error
      const response = h.response({
        status: 'fail',
        message: 'Internal Server Error'
      })
      response.code(500)
      console.error(error)
      return response
    }
  }

  async postNewFactHandler (request, h) {
    try {
      const { newFact, author } = request.payload
      const newFactId = await this._factService.addFact({ newFact, author })
      const response = h.response({
        status: 'success',
        message: 'Fact added!',
        data: {
          newFactId
        }
      })
      response.code(201)
      return response
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'failed',
          message: error.message
        })
        response.code(error.statusCode)
        return response
      }
      // server error
      const response = h.response({
        status: 'fail',
        message: 'Internal Server Error'
      })
      response.code(500)
      console.error(error)
      return response
    }
  }

  async deleteFactHandler (request, h) {
    try {
      const { id } = request.params
      await this._factService.deleteFact({ id })
      const response = h.response({
        status: 'success',
        message: 'Fact deleted!'

      })
      response.code(201)
      return response
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'failed',
          message: error.message
        })
        response.code(error.statusCode)
        return response
      }
      // server error
      const response = h.response({
        status: 'fail',
        message: 'Internal Server Error'
      })
      response.code(500)
      console.error(error)
      return response
    }
  }
}

module.exports = FactsHandler
