import { Request, Response } from 'express';

export const createUser = (req: Request, res: Response) => {
    return res.status(200).json({ message: 'First endpoint of a big future'});
 }