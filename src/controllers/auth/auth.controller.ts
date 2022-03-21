import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { SignInRequestInterface } from '../../interfaces/auth/auth.interface';
import User from '../../models/User.model';

export const signIn = async (req: Request, res: Response): Promise<Response> => {
    const body: SignInRequestInterface = req.body;
    const { email, password } = body;
    const userFound = await User.findOne({ email })

    if (!userFound) {
        return res.status(404).json({ message: 'User or password wrong' })
    }
    const matchPassword = await userFound.comparePassword(password);

    if (!matchPassword) {
        return res.status(404).json({ message: 'User or password wrong' });
    }
    const token = jwt.sign({ id: userFound._id }, config.secret, {
        expiresIn: 86400
    });
    const refreshThisToken = jwt.sign({ id: userFound._id }, config.secretRrefersh, { expiresIn: 3.154e10 });

    const user = userFound._id;
    const name = userFound.names;



    return res.status(200).json({ token, user, email, name, refreshThisToken });
}