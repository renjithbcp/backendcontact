import { constants } from "../constatnts.js";
const errorHandler = (err,req,res,next)=>{
const statusCode = res.statusCode ? res.statusCode : 500;
switch (statusCode) {
    case constants.VALIDATION_ERROR:
        res.json({title:"Validation Error",message:err.message,stackTrace:err.stackTrace});
        break;
        case constants.FORBIDDEN:
            res.json({title:"Forbiddennd",message:err.message,stackTrace:err.stackTrace});
        break;
        case constants.UNAUTHORIZED:
            res.json({title:"UnAuthorized",message:err.message,stackTrace:err.stackTrace});
        break;
        case constants.NOT_FOUND:
            res.json({title:"Not Found",message:err.message,stackTrace:err.stackTrace});
        break;
        case constants.SERVER_ERROR:
            res.json({title:"Server Error",message:err.message,stackTrace:err.stackTrace});
        break;

    default:
        break;
}
res.json({title:"Not Found",message:err.message,stackTrace:err.stackTrace});
};

export default errorHandler;