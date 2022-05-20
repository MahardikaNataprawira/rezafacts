/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('facts', {
    id: {
      type: 'INT',
      primaryKey: true,
      notNull: true,
      serial: true
    },
    fact: {
      type: 'VARCHAR(1000)',
      notNull: true
    },
    source: {
      type: 'VARCHAR(100)',
      notNull: true
    }
  })
}
exports.down = pgm => {
  pgm.dropTable('facts')
}
