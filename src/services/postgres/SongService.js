const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const { mapDBToModel } = require('../../utils/entitySongs');
const NotFoundError = require('../../exceptions/NotFoundError');
const InvariantError = require('../../exceptions/InvariantError');

class songService {
    constructor() {
        this._pool = new Pool();
    }

    async addSong({ title, year, genre, performer, duration, albumId }) {
        const numbers = nanoid(16);
        const id = `song-${numbers}`;
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO songs values ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
            values: [id, title, year, performer, genre, duration, albumId, createdAt, updatedAt ]
        }

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Failed to add song');
        }

        return result.rows[0].id;

        }

    async getSongs() {
        const result = await this._pool.query('SELECT * FROM songs');
        return result.rows.map(mapDBToModel);
        }

    async getSongByID(id) { 
        const query = {
            text: 'SELECT * FROM songs WHERE id=$1',
            values: [id],
        }
        const result = await this._pool.query(query)

        if (!result.rows.length) {
            throw new NotFoundError('Song Not Found')
        }

        const song = result.rows.map(mapDBToModel)
        return song
    }

    async editSongById(id, payloadData) {
        const updateAt = new Date().toISOString()
        const query = {
            text: 'UPDATE songs SET title=$1, year=$2, performer=$3, genre=$4, duration=$5, albumId=$6, WHERE id=$7 RETURNING id',
            value: [
                payloadData.name,
                payloadData.year,
                payloadData.performer, 
                payloadData.genre, 
                payloadData.duration,
                payloadData.albumId, 
                updateAt,
                id
            ]
        }

        const result = await this._pool.query(query)

        if (!result.rows.length) {
            throw new NotFoundError('Update Failed. Id not found')
        }
    }

    async deleteSongById(id, payloadData) {
        const query = {
            text: 'DELETE FROM songs WHERE id=$1 RETURNING id' ,
            values: [id]
        }

        const result = await this._pool.query(query)

        if (!result.rows.length){
            throw new NotFoundError('Delete failed. Id not found')
        }
    } 
}

module.exports = songService;
