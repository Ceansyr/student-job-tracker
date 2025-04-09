const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || res.statusCode === 200 ? 500 : res.statusCode;
  
    console.error(`❌ Error [${statusCode}]: ${err.message}`);
  
    res.status(statusCode).json({
      success: false,
      message: err.message || 'Internal Server Error',
    });
  };
  
  export default errorHandler;
  