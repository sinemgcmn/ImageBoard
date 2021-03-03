const spicedPg = require("spiced-pg");

const db = spicedPg("postgres:postgres:postgres@localhost:5432/imageboard");

module.exports.getInfoImages = () => {
    const q = `SELECT * FROM images
               ORDER BY id DESC
               LIMIT 6`;

    return db.query(q);
};

module.exports.getImageById = (id) => {
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

///part-4////

module.exports.getFurtherImages = (id) => {
    const q = `
      SELECT id,url,title, (
      SELECT id FROM images
      ORDER BY id ASC
      LIMIT 1)
      AS "lowestId" FROM images
      WHERE id < $1
      ORDER BY id DESC
      LIMIT 6`;
    const params = [id];
    return db.query(q, params);
};

///part-5////

module.exports.getAllComments = (imageId) => {
    const q = `SELECT * 
               FROM comments 
               WHERE commentid=${imageId}`;

    return db.query(q);
};

module.exports.insertComments = (comment, username, imageId) => {
    const q = `
        INSERT INTO comments (comment, username, commentid)
        VALUES ($1, $2, $3)
        RETURNING comment, username, commentid; 
    `;
    const params = [comment, username, imageId];
    return db.query(q, params);
};
