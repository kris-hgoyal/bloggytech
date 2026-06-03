const notFound = (req, res , next) => {
    let error = new Error(`Route ${req.originalUrl} not found`);
    error.status = 404;
    next(error);
}


const globalErrorHnadler = (error,req,resp,next) => {
    const status = error?.status || 500;
    const stack = error?.stack || "No stack trace available";
    const message = error?.message || "An unexpected error occurred";
    resp.status(status).json({ status, message, stack });
}

module.exports = { globalErrorHnadler, notFound };