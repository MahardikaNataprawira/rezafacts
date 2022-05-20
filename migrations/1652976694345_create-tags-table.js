/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('tags', {
    id: {
      type: 'INT',
      primaryKey: true,
      notNull: true
    },
    tag_content: {
      type: 'VARCHAR(50)',
      notNull: true
    }
  })
}

exports.down = pgm => {
  pgm.dropTable('tags')
}
