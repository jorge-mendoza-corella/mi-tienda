const errorDB = require('../middlewares/error.handler');
const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');

async function resultFromQuery(pool, query, id, validate, next) {
    const [data,metadata] = await sequelize.query(query,
       { bind: id ? [id]:[] } // para cuando hay o no parametros, hago esta validacion. El objeto bind me dice cuales son los parametros
      );

    if (validate && metadata.rowCount == 0 ) {
        throw boom.notFound('Sin informacion');
    }

    return data;
}

module.exports = resultFromQuery;
