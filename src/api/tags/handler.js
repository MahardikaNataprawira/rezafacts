const ClientError = require('../../exceptions/ClientError')

class TagsHandler {
  constructor (tagService) {
    this._tagService = tagService
  }

  async getTagByFactHandler (request, h) {
    try {
      const { factId } = request.params
      const tags = await this._tagService.getTagByFact({ factId })
      const response = h.response({
        status: 'success',
        message: 'successfully get tags',
        data: {
          tags
        }
      })
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

  async addTagHandler (request, h) {
    try {
      const { factId, tagId } = request.payload
      await this._tagService().addTag({ factId, tagId })

      const response = h.response({
        status: 'success',
        message: 'Tag successfully added'
      })

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

  async updateTagHandler (request, h) {
    try {
      // TODO

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

  async deleteTagHandler (request, h) {
    try {
      const { tag } = request.params
      await this._tagService.deleteTagById({ tag })
      const response = h.response({
        status: 'success',
        message: 'successfully deleted tag'
      })
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

module.exports = TagsHandler
