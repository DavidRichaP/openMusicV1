const Hapi = require('@hapi/hapi');
const MusicSearch = require('./api/music-search');
const MusicService = require('./services/inMemory/MusicService');
const MusicValidator = require('./validator/music');
require('dotenv').config();

const init = async () -> {
    const MusicService = new MusicService();
    const server = Hapi.server({
        // jangan lupa buat file .env
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors:{
                origin: ['*'],
            },
        },
    });

    await server.register({
        plugin: MusicSearch,
        options: {
            service: MusicService,
            validator: MusicValidator,
        },
    });

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
