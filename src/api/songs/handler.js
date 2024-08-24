const autoBind = require('auto-bind')
const ClientError = require('../../exceptions/ClientError')

class SongHandler {
	constructor(service, validator) {
		this._service = service.song
		this._validator = validator.song

		autoBind(this)
	}

	// from post to delete these are the handlers for songs
	async postSongHandler(request, h) {
		try {
			this._validator.validateSongsPayload(request.payload)

			const { title, year, genre, performer, duration, albumId } =
				request.payload

			const songs = await this._service.addSong({
				title,
				year,
				genre,
				performer,
				duration,
				albumId,
			})

			const response = h.response({
				status: 'success',
				message: 'Lagu sukses ditambahkan',
				data: {
					songId: songs,
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

	async getSongsHandler() {
		const songs = await this._service.getSongs()
		return {
			status: 'success',
			data: {
				songs,
			},
		}
	}

	async getSongByIdHandler(request, h) {
		try {
			const { id } = request.params
			const song = await this._service.getSongById(id)
			return {
				status: 'success',
				data: {
					song,
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

	async putSongByIdHandler(request, h) {
		try {
			this._validator.validateSongsPayload(request.payload)

			const { id } = request.params

			await this._service.editSongById(id, request.payload)

			return {
				status: 'success',
				message: 'Lagu berhasil diperbarui',
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

	async deleteSongByIdHandler(request, h) {
		try {
			const { id } = request.params
			await this._service.deleteSongById(id)
			return {
				status: 'success',
				message: 'Lagu berhasil dihapus',
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

module.exports = SongHandler
