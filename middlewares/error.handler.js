function logErrors(err, req, res, next) {
  //console.log('logErrors');
  console.error(err+" en "+errorFunctionName(err));
  next(err);
}

function errorHandler(err, req, res, next) {
  //console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}


function errorBoom(err, req, res, next) {
  //console.log('errorBoom');
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  else{
    next(err);
  }
}


function errorFunctionName(error) {
  const stackTrace = error.stack;
  const functionNameRegex = /at\s+(.*)\s+\(/;
  const functionNameRegex2 = /([\w\d_.-]+\.js):(\d+):(\d+)/;

  return "archivo: " + functionNameRegex2.exec(stackTrace)[1] + " funcion: " + functionNameRegex.exec(stackTrace)[1] + " linea: " + functionNameRegex2.exec(stackTrace)[2];
}


module.exports = { logErrors, errorHandler, errorBoom }
