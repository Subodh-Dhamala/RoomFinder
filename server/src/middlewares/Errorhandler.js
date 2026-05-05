const errorHandler = (err, req, res, next) => {
  console.log('ERROR:', err.message, err.status, err.statusCode)
  
  res.status(err.status || err.statusCode || 500).json({
    message: err.message || 'Server Error',
  })
}

export default errorHandler;