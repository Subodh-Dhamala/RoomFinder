const errorHandler = (err, req, res, next) => {
  console.log('ERROR FULL:', JSON.stringify(err, null, 2))
  console.log('ERROR STATUS:', err.status)
  console.log('ERROR STATUSCODE:', err.statusCode)
  console.log('ERROR CODE:', err.code)
  
  res.status(err.status || err.statusCode || 500).json({
    message: err.message || 'Server Error',
  })
}

export default errorHandler;