const Hapi = require('@hapi/hapi');
const albumService = require('./services/postgres/AlbumService');
const musicService = require('./services/postgres/SongService');
const songValidator = require('../src/validator/songs');
const albumValidator = require('../src/validator/album');
require('dotenv').config();

const init = async () => {
    const openMusicSongs = new musicService();
    const openMusicAlbums = new albumService();
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors:{
                origin: ['*'],
            },
        },
    });

    await server.register([
        {
            plugin: albums,
            options: {
                service: {
                    album: openMusicAlbums
                },
                validator: {
                    album: albumValidator
                },
            },
        },
        {
            plugin: songs,
            options: {
                service: {
                    song: openMusicSongs
                },
            },
            validator: {
                song: songValidator
            },
        },
    ]);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
