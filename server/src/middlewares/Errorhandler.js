const errorHandler = (err, req, res, next) => {
  console.log('ERROR FULL:', JSON.stringify(err, null, 2))
  console.log('ERROR STATUS:', err.status)
  console.log('ERROR STATUSCODE:', err.statusCode)
  console.log('ERROR CODE:', err.code)

  let statusCode = err.status || err.statusCode || 500
  let message = err.message || 'Server Error'

  // Explicitly handle native MongoDB Duplicate Key Errors
  if (err.code === 11000) {
    statusCode = 400
    message = 'This item is already in your wishlist.'
  }

  res.status(statusCode).json({
    message: message,
  })
}

export default errorHandler;