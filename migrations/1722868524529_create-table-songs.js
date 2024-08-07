/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable('songs', {
        SongId: {
            type: 'VARCHAR(50)',
            primaryKey: true,
            notNull: true
        },
        title: {
            type: 'TEXT',
            notNull: true
        },
        year: {
            type: 'TEXT',
            notNull: true,
        },
        genre: {
            type: 'TEXT',
            notNull: true,
        },
        performer: {
            type: 'text',
            notNull: true,
        },
        duration: {
            type: 'TEXT',
        },
        albumId: {
            type: 'TEXT',
        }

    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
