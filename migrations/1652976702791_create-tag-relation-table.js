/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('tag_relation', {
    id: {
      type: 'INT',
      primaryKey: true
    },
    fact_id: {
      type: 'INT',
      notNull: true
    },
    tag_id: {
      type: 'INT',
      notNull: true
    }
  })
}

exports.down = pgm => {
  pgm.dropTable('tag_relation')
}
