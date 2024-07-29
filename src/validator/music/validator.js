// error const here
const { openMusicPayloadSchema } = require('./schema');

const MusicValidator = {
    validateMusicPayload: (payload) => {
        const validationResult = openMusicPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new (validationResult.error.message);
        }
    },
};

module.exports = MusicValidator