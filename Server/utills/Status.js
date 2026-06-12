
//using this function to successfully fetch data from the database and send it to the client
export const Success = (res, message = "Success", data = null, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

//using this function to send an error response to the client when there is an internal server error
export const ServerError = (res, message = "Internal server error", error = null) => {
  return res.status(500).json({
    success: false,
    message,
    error
  });
};

//using this function to send a response to the client when a new resource is created successfully
export const Created = (res, message = "Resource created successfully", data = null) => {
    return res.status(201).json({
        success: true,
        message,
        data
    });
};

//using this function to send a response to the client when access is denied

export const Forbidden = (res, message = "Access denied") => {
  return res.status(403).json({
    success: false,
    message
  });
};

//using this function to send a response to the client when a user is not authorized
export const Unauthorized = (res, message = "Unauthorized access") => {
  return res.status(401).json({
    success: false,
    message
  });
};

//using this function to send a response to the client when there is a bad request
export const BadRequest = (res, message = "Bad request", error = null) => {
  return res.status(400).json({
    success: false,
    message,
    error
  });
};

//using this function to send a response to the client when a resource is not found
export const NotFound = (res, message = "Resource not found") => {
    return res.status(404).json({
        success: false,
        message
    });
};