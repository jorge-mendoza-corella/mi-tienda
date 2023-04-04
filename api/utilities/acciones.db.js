const errorDB = require('../middlewares/error.handler');
const boom = require('@hapi/boom');

async function resultFromQuery(pool, query, id, validate, next) {
    const resultado = await pool.query(query, id ? [id] : []); // para cuando hay o no parametros, hago esta validacion

    if (validate && resultado.rowCount == 0 ) {
        throw boom.notFound('Sin informacion');
    }

    return resultado.rows;
}

module.exports = resultFromQuery;
