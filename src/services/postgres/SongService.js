const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const { InvariantError } = require('../../exceptions/InvariantError');
const { mapDBToModel } = require('../../utils');
const { date } = require('joi');

class songService {
    constructor() {
        this._pool = new Pool();
    }

    async getAlbums() {
        const result = await this._pool.query('SELECT * FROM OpenMusicBackend');
        return result.rows.map(mapDBToModel);
    }

    async addSong({ title, year, genre, performer, duration, albumId }) {
        const createdAt = new date().toISOString();
        const updatedAt = createdAt;

        const numbers = nanoid(16);
        const id = `song-${numbers}`;

        const query = {
            text: 'INSERT INTO OpenMusicBackend values ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
            values: [id, title, year, performer, genre, duration, albumId]
        }

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Lagu gagal ditambahkan');
        }

        return result.rows[0].id;

        }

    async getSongs() {
        const result = await this._pool.query('SELECT * FROM ');
        return result.rows.map(mapDBToModel);
        }
}

module.exports = songService;
