import { Request, Response, NextFunction } from "express"
import { BasicErrorResponseInterface } from "../interfaces/errors/basic-errors.interface";

export const verifyConsultPersonalData = (req: Request, res: Response, next: NextFunction) =>{
    const { id } = req.params;

    if(id !== req.userId){
        const errorResponse: BasicErrorResponseInterface = {
            state: 0,
            message: "Unauthorized request"
        }
        return res.status(400).json(errorResponse);
    }

    next();
}

