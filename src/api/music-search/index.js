
const { version } = require('joi');
const MusicHandler = require('./handler');
const routes = require('./routes')

module.exports = {
    name: 'OpenMusic',
    version: '1.0.0',
    register: async (server, { service, validator }) => {
        const MusicHandler = new MusicHandler(service , validator);
        server.route(routes(MusicHandler));
    },
};
