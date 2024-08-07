const SongRoutes = [
// routes for song handling
    {
        method: 'POST',
        path: '/music-search',
        handler: handler.postSongHandler,
    },
    {
        method: 'GET',
        path: '/music-search',
        handler: handler.getSongsHandler,
    },
    {
        method: 'GET',
        path: '/music-search/{id}',
        handler: handler.getSongByIdHandler,
    },
    {
        method: 'PUT',
        path: '/music-search/{id}',
        handler: handler.putSongByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/music-search/{id}',
        handler: handler.deleteSongByIdHandler,
    },
];

module.exports = SongRoutes;
