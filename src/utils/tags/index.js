/* eslint-disable camelcase */
const MapDBToModel = ({
  id,
  fact_id,
  tag_id

}) => ({
  id,
  factId: fact_id,
  tagId: tag_id
})

module.exports = { MapDBToModel }
