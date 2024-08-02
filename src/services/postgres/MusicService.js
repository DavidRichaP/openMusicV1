const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const { InvariantError } = require('../../exceptions/InvariantError');
const { mapDBToModel } = require('../../utils');
const { date } = require('joi');

class OpenMusic {
    constructor() {
        this._pool = new Pool();
    }

    async addAlbum({ name, year }) {
        const numbers = nanoid(16);
        const id = `album-${numbers}`;
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt

        const query = { 
            text: 'INSERT INTO Album_db values ($1, $2, $3, $4, $5) RETURNING id',
            values: [id, name, year , createdAt, updatedAt],
        };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
        throw new InvariantError('Album gagal ditambahkan');
    }

    return result.rows[0].id;

    }

    async getAlbums() {
        const result = await this._pool.query('SELECT * FROM Album_db');
        return result.rows.map(mapDBToModel);
    }

    async addSong({ title, year, genre, performer, duration, albumId }) {
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const numbers = nanoid(16);
        const id = `song-${numbers}`;

        const query = {
            text: 'INSERT INTO values ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
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
