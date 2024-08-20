// here will be for DB mapping

const mapDBToModel = ({
    id,
    name,
    year,
    title,
    genre,
    performer,
    duration,
    albumId,
    created_at,
    updated_at
  }) => ({
    id,
    name,
    year,
    title,
    genre,
    performer,
    duration,
    albumId,
    createdAt: created_at,
    updatedAt: updated_at,
  });
  
  module.exports = (mapDBToModel);
  