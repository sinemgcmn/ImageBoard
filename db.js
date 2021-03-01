const spicedPg = require("spiced-pg");

const db = spicedPg("postgres:postgres:postgres@localhost:5432/imageboard");

module.exports.getInfoImages = () => {
    const q = `SELECT * FROM images`;

    return db.query(q);
};

module.exports.getImageById = (id) => {
    console.log(id);
    const q = `SELECT * FROM images WHERE id=${id}`;
    return db.query(q);
};

module.exports.addImage = (title, description, username, url) => {
    const q = `
        INSERT INTO images (title, description, username, url)
        VALUES ($1, $2, $3, $4)
        RETURNING id;
    `;
    const params = [title, description, username, url];
    return db.query(q, params);
};
