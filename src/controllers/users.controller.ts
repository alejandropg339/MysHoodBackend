import { Request, Response } from 'express';
import { BasicErrorResponseInterface } from '../interfaces/errors/basic-errors.interface';
import { UserCreateRequestInterface, UserCreateResponseInterface, UserInterface } from '../interfaces/models/user.interface';
import User from '../models/User.model';



export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const body: UserCreateRequestInterface = req.body;
    const { names, lastNames, phone, email, password, address } = body;
    const userRequest = new User({ names, lastNames, phone, email, password, address });
    try {
        const newUser = await userRequest.save();
        if (newUser) {
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

export const personalData = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const infoUser: UserInterface = await User.findOne({ _id: id }).lean();
        const errorReponse: BasicErrorResponseInterface = {
            state: 0,
            message: 'User not found!'
        }
        if (!infoUser) {
            return res.status(404).json(errorReponse);
        }

        const { password, ...personalInfo } = infoUser;
        res.status(200).json(personalInfo);

    } catch (error: any) {
        const errorReponse: BasicErrorResponseInterface = {
            state: 0,
            message: 'Somethig goes wrong!',
            errorData: error.message
        }
        return res.status(500).json(errorReponse);
    }
}