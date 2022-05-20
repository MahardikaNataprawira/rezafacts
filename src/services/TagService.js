const { Pool } = require('pg')
const { mapDBToModel } = require('../utils/tags')
const InvariantError = require('../exceptions/InvariantError')
const NotFoundError = require('../exceptions/NotFoundError')

class TagService {
  constructor () {
    this._pool = new Pool()
  }

  async addTag ({ factId, tagId }) {
    const query = {
      text: 'INSERT INTO tag_relation VALUES($1, $2) RETURNING id',
      values: [factId, tagId]
    }

    const result = await this._pool.query(query)

    if (!result.rows[0].id) {
      throw new InvariantError('Tag failed to add')
    }

    return result.rows[0].id
  }

  async getTags ({ factId }) {
    const query = {
      text: `SELECT * FROM tags
            JOIN tags ON tag_relation.tag_id=tags.id
            WHERE tag_relation.fact_id = $1 `,
      values: [factId]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw NotFoundError('Tag not found')
    }
    return result.rows.map(mapDBToModel)[0]
  }

  async getFacts ({ tagId }) {
    const query = {
      text: `SELECT * FROM facts
                JOIN facts ON tag_relation.fact_id=facts.id
                WHERE tag_relation.tag_id = $1`,
      values: [tagId]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw NotFoundError('Fact not found')
    }
    return result.rows.map(mapDBToModel)[0]
  }
}

module.exports = TagService
