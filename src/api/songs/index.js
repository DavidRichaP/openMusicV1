const { version } = require('joi')
const SongsHandler = require('./handler')
const routes = require('./routes')

module.exports = {
	name: 'songs',
	version: '1.0.0',
	register: async (server, { service, validator }) => {
		const OpenMusic = new SongsHandler(service, validator)
		server.route(routes(OpenMusic))
	},
}
