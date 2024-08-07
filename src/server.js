const Hapi = require('@hapi/hapi');
const AlbumService = require('./services/postgres/AlbumService');
const MusicService = require('./services/postgres/MusicService');
const SongValidator = require('../src/validator/songs');
const AlbumValidator = require('../src/validator/album');
require('dotenv').config();

const init = async () => {
    const OpenMusicSongs = new MusicService();
    const OpenMusicAlbums = new AlbumService();
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
                    album: OpenMusicAlbums
                },
                validator: {
                    album: AlbumValidator
                },
            },
        },
        {
            plugin: songs,
            options: {
                service: {
                    song: OpenMusicSongs
                },
            },
            validator: {
                song: SongValidator
            },
        },
    ]);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
