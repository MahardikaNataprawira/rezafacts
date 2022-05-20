const { Pool } = require('pg')
const { mapDBToModel } = require('../utils/facts')
const NotFoundError = require('../exceptions/NotFoundError')
const InvariantError = require('../exceptions/InvariantError')

class DatabaseService {
  constructor () {
    this._pool = new Pool()
  }

  async getLatestIndex () {
    const latestIndex = {
      text: 'SELECT id FROM facts DESCENDING limit 1'
      // text: `SELECT timestamp, value, card
      //       FROM facts t1
      //       WHERE NOT EXISTS (
      //       SELECT *
      //       FROM facts t2
      //       WHERE t2.timestamp > t1.timestamp
      //     );`
    }
    return latestIndex
  }

  async addFact ({ newFact, author }) {
    const query = {
      text: 'INSERT INTO facts VALUES($1, $2) RETURNING id',
      values: [newFact, author]
    }

    const result = await this._pool.query(query)

    if (!result.rows[0].id) {
      throw new InvariantError('Failed to add a new fact!')
    }
    return result.rows[0].id
  }

  async getFactById ({ id }) {
    const query = {
      text: 'SELECT FROM facts WHERE id = $1',
      values: [id]
    }

    const result = await this._pool.query(query)

    if (!result.rows.map) {
      throw new NotFoundError('Fact not found!')
    }

    return result.rows.map(mapDBToModel)[0]
  }

  async getRandomFact () {
    const latestIndex = await this.getLatestIndex()
    const index = Math.random(0, latestIndex)

    const query = {
      text: 'SELECT FROM facts WHERE index = $1',
      values: [index]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('Fact not found!')
    }
    return result.rows.map(mapDBToModel)[0]
  }

  async updateFact ({ factId, fact }) {
    const query = {
      text: 'UPDATE facts SET fact = $1 WHERE id = $2 RETURNING id',
      values: [fact, factId]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('Fact not found!')
    }

    return result.rows.map(mapDBToModel)[0]
  }

  async deleteFact ({ factId }) {
    const query = {
      text: 'DELETE FROM facts WHERE id = $1 RETURNING id',
      values: [factId]
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('Fact not found!')
    }

    return result.rows.map(mapDBToModel)[0]
  }
}

module.exports = DatabaseService
