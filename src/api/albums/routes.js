const AlbumRoutes = (handler) => [

    // routes for album handling
    {
        method: 'POST',
        path: '/music-search',
        handler: handler.postAlbumHandler,
    },
    {
        method: 'GET',
        path: '/music-search',
        handler: handler.getAlbumsHandler,
    },
    {
        method: 'GET',
        path: '/music-search/{id}',
        handler: handler.getAlbumByIdHandler,
    },
    {
        method: 'PUT',
        path: '/music-search/{id}',
        handler: handler.putAlbumByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/music-search/{id}',
        handler: handler.deleteAlbumByIdHandler,
    },
];

module.exports = AlbumRoutes;
