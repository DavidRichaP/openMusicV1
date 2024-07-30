const InvariantError = require('../../exceptions/InvariantError')
const { AlbumPayloadSchema, SongPayloadSchema } = require('./schema');

const MusicValidator = {
    validateAlbumsPayload: (payload) => {
        const validationResult = AlbumPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError (validationResult.error.message);
        }
    },

    validateSongsPayload: (payload) => {
        const validationResult = SongPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError (validationResult.error.message)
        }
    }
};

module.exports = MusicValidator;
