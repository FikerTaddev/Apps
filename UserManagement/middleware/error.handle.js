
export function errorHandler(err, req, res, next) {
   
    const statusCode = err.statuscode || 500
  
    res.status(statusCode).json({
      error: err.message || "Internal server error"
    })
  }

