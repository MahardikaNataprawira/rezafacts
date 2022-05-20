/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.addConstraint('tag_relation', 'unique_tag_id_and_tag_id', 'UNIQUE(fact_id, tag_id)')
  pgm.addConstraint('tag_relation', 'fk_tag_relation.fact_id_facts.id', 'FOREIGN KEY(fact_id) REFERENCES facts(id)')
  pgm.addConstraint('tag_relation', 'fk_tag_relation.tag_id_tags.id', 'FOREIGN KEY(tag_id) REFERENCES tags(id)')
}

exports.down = pgm => {}
