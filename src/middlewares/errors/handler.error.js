import EErrors from "../../services/enums.js";

export const handlerError = (error, req, res, next) => {
   
    switch (error.code) {
      case EErrors.INVALID_TYPES_ERROR:
        res.json({
          error: {
            message: error.message
          }
        });
        break;
      case EErrors.DATABASE_ERROR:
        res.json({
          error: {
            message: "An error occurred while accessing the database."
          }
        });
        break;
      case EErrors.ROUTING_ERROR:
        res.json({
          error: {
            message: "The requested resource was not found."
          }
        }); 
        break;
      default:
        res.json({
          error: {
            message: "An unexpected error occurred."
          }
        });
    }

    next();
  };
  