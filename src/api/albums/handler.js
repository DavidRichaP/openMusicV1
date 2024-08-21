const autoBind = require('auto-bind')
const ClientError = require('../../exceptions/ClientError')

class AlbumHandler {
	constructor(service, validator) {
		this._service = service.album
		this._validator = validator.album

		autoBind(this)
	}

	// from post to delete these are the handlers for album
	async postAlbumHandler(request, h) {
		try {
			this._validator.validateAlbumsPayload(request.payload)

			const { name, year } = request.payload

			const albums = await this._service.addAlbum({ name, year })

			const response = h.response({
				status: 'success',
				message: 'Album sukses ditambahkan',
				data: {
					albumId: albums,
				},
			})
			response.code(201)
			return response
		} catch (error) {
			if (error instanceof ClientError) {
				const response = h.response({
					status: 'fail',
					message: error.message,
				})
				response.code(error.statusCode)
				return response
			}

			const response = h.response({
				status: 'error',
				message: 'Maaf, terjadi kegagalan pada server kami.',
			})
			response.code(500)
			console.error(error)
			return response
		}
	}

	async getAlbumsHandler() {
		const albums = await this._service.getAlbums()
		return {
			status: 'success',
			data: {
				albums,
			},
		}
	}

	async getAlbumByIdHandler(request, h) {
		try {
			const { id } = request.params
			const album = await this._service.getAlbumById(id)
			return {
				status: 'success',
				data: {
					album,
				},
			}
		} catch (error) {
			if (error instanceof ClientError) {
				const response = h.response({
					status: 'fail',
					message: error.message,
				})
				response.code(error.statusCode)
				return response
			}

			const response = h.response({
				status: 'error',
				message: 'Maaf, terjadi kegagalan pada server kami.',
			})
			response.code(500)
			console.error(error)
			return response
		}
	}

	async putAlbumByIdHandler(request, h) {
		try {
			this._validator.validateAlbumsPayload(request.payload)

			const { id } = request.params

			await this._service.editAlbumById(id, request.payload)

			return {
				status: 'success',
				message: 'Album berhasil diperbarui',
			}
		} catch (error) {
			if (error instanceof ClientError) {
				const response = h.response({
					status: 'fail',
					message: error.message,
				})
				response.code(error.statusCode)
				return response
			}

			const response = h.response({
				status: 'error',
				message: 'Maaf, terjadi kegagalan pada server kami',
			})
			response.code(500)
			console.error(error)
			return response
		}
	}

	async deleteAlbumByIdHandler(request, h) {
		try {
			const { id } = request.params
			await this._service.deleteAlbumById(id)
			return {
				status: 'success',
				message: 'Album berhasil dihapus',
			}
		} catch (error) {
			if (error instanceof ClientError) {
				const response = h.response({
					status: 'fail',
					message: 'Maaf, terjadi kegagalan pada server kami.',
				})
				response.code(error.statusCode)
				return response
			}
			const response = h.response({
				status: 'error',
				message: 'Maaf, terjadi kegagalan pada server kami',
			})
			response.code(500)
			console.error(error)
			return response
		}
	}
}

module.exports = AlbumHandler
