const { default: autoBind } = require('auto-bind');
const ClientError = require('../../exceptions/ClientError');

class SongHandler {
    constructor(service, validator) {
        this.service = service;
        this.AlbumValidator = validator;

        autoBind(this);
    }

    // from post to delete these are the handlers for songs
    postSongHandler(request, h) {
        try {
          this.validator.validateDbPayload(request.payload);

          const { title, year, genre, performer, duration, albumId} = request.payload;

          const SongId = this.service.addSong({ title, year, genre, performer, duration, albumId });

          const response = h.response({
            status: 'success',
            message: 'Lagu sukses ditambahkan',
            data: {
              SongId: SongId,
            },
          });
          response.code(201);
          return response;
        } catch (error) {

            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    getSongsHandler() {
        const songs = this.service.getSongs();
        return {
            status: 'success',
            data: {
                songs,
            },
        };
    }

    getSongByIdHandler(request, h) {
        try  {
            const { id } = request.params;
            const song = this.service.getSongById(id);
            return {
                status: 'success',
                data: {
                 song,
                },
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.'
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    putSongByIdHandler(request, h) {
        try {
          this.validator.validateDbPayload(request.payload);

          const { id } = request.params;

          this.service.editSongById(id, request.payload);

          return {
            status: 'success',
            message: 'Lagu berhasil diperbarui',
          };
        } catch (error) {
          if (error instanceof ClientError) {
            const response = h.response({
                status: 'fail',
                message: error.message,
            });
            response.code(error.statusCode);
            return response;
          }

          const response = h.response({
            status: 'error',
            message: 'Maaf, terjadi kegagalan pada server kami',
          });
          response.code(500);
          console.error(error);
          return response;
        }
    }

    deleteAlbumByIdHandler(request, h) {
        try{
            const { id } = request.params;
            this.service.deleteSongById(id);
            return {
                status: 'success',
                message: 'Lagu berhasil dihapus',
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: 'Maaf, terjadi kegagalan pada server kami.',
                });
            }
            const response = h.response({
                    status: 'error',
                    message: 'Maaf, terjadi kegagalan pada server kami',
                });
            response.code(500);
            console.error(error);
            return response;    
        }
    }

}

module.exports = SongHandler;
