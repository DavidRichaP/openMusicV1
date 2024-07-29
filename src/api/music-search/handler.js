const ClientError = require('../../exceptions/');
// masukkan custom error

// apa harus bind satu satu? boleh dicoba kok package auto bind
class MusicHandler {
    constructor(service, validator) {
        this.service = service;
        this.validator = validator;

        
        // binder masuk sini njing
    }

    // bawah ini semua functionnya API. dari post sampe delete
    postAlbumHandler(request, h) {
        try {
          const { name, year} = request.payload;

          const albumId = this.service.addAlbum({ name, year });

          const response = h.response({
            status: 'success',
            message: '',
            data {
              albumId: albumId,
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

    getAlbumsHandler() {
        const albums = this.service.getAlbums();
        return {
            status: 'success',
            data: {
                albums,
            },
        };
    }

    getAlbumByIdHandler(request, h) {
        try  {
            const { id } = request.params;
            const album = this.service.getAlbumById(id);
            return {
                status: 'success',
                data: {
                 album,
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

    putAlbumByIdHandler(request, h) {
        try {
          this.validator.validateDbPayload(request.payload);

          const { id } =request.params;

          this.service.editAlbumById(id, request.payload);

          return {
            status: 'success',
            message: 'Album berhasil diperbarui',
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
            this.service.deleteNoteById(id);
            return {
                status: 'success',
                message: 'Album berhasil dihapus',
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: 'Maaf, terjadi kegagalan pada server kami.',
                });
            }
            const response = h.response({
                    status: 'errror',
                    message: 'Maaf, terjadi kegagalan pada server kami',
                });
            response.code(500);
            console.error(error);
            return response;    
        }
    }
}

module.exports = MusicHandler;
