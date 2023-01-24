import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { user, User } from '../models/user';
import { authorizeChecker } from '../middleware/authrize_checker_jwt';

const newuser = new User();
const index = async (_req: Request, res: Response) => {
    try {
        const users = await newuser.index();
        res.json(users);
    } catch (err) {
        res.status(400).json(err);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const users = await newuser.show(Number(req.params.id));
        res.json(users);
    } catch (err) {
        res.status(400).json(err);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const user_info: user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
        };

        const users = await newuser.create(user_info);
        const token = jwt.sign(
            { user_info: users },
            process.env.TOKEN_SECRET as string
        );

        res.json(token);
    } catch (err) {
        res.status(400).json(err);
    }
};

const delete_user = async (req: Request, res: Response) => {
    try {
        const users = await newuser.delete_user(Number(req.params.id));
        res.json(users);
    } catch (err) {
        res.status(400).json(err);
    }
};
const patch_user = async (req: Request, res: Response) => {
    try {
        const user_info: user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
        };
        const users = await newuser.update_user(
            Number(req.params.id),
            user_info
        );
        res.json(users);
    } catch (err) {
        res.status(400).json(err);
    }
};

const userRouter = (app: express.Application) => {
    app.get('/users', authorizeChecker, index),
        app.get('/users/:id', authorizeChecker, show),
        app.post('/users/', create),
        app.delete('/users/:id', authorizeChecker, delete_user),
        app.patch('/users/:id', authorizeChecker, patch_user);
};
export default userRouter;
