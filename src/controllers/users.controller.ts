import { Request, Response } from 'express';
import { BasicErrorResponseInterface } from '../interfaces/errors/basic-errors.interface';
import { UserCreateRequestInterface, UserCreateResponseInterface } from '../interfaces/models/user.interface';
import User from '../models/User.model';

export const createUser = async (req: Request, res: Response) => {
    const body: UserCreateRequestInterface = req.body;
    const { names, lastNames, phone, email, password, address } = body;
    const userRequest = new User({names, lastNames, phone, email, password, address});
    try {
        const newUser = await userRequest.save();
        console.log(newUser);
        if(newUser){
            const succesResponse: UserCreateResponseInterface = {
                state: 1,
                message: 'User created successfully',
                data: newUser
            }
            return res.status(201).json(succesResponse);
        }
        const errorResponse: BasicErrorResponseInterface = {
                state: 0,
                message: "Error while creating the new user",
        }
        return res.status(500).json(errorResponse);
    } catch (error: any) {
        const errorResponse: BasicErrorResponseInterface = {
            state: 0,
            message: "Error while creating the new user",
            errorData: error.message
        }
        return res.status(501).json(errorResponse);
    }
 }