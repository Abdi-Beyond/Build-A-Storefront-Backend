import express, { Request, Response } from 'express';
import { authorizeChecker } from '../middleware/authrize_checker_jwt';
import { order, Order } from '../models/order';

const neworder = new Order();

const create = async (req: Request, res: Response) => {
    try {
        const order_info: order = {
            status: req.body.status,
            user_id: req.body.user_id,
        };
        const orders = await neworder.create(order_info);
        res.json(orders);
    } catch (err) {
        res.status(400).json(err);
    }
};
const update_order = async (req: Request, res: Response) => {
    try {
        const order_info: order = {
            user_id: req.body.user_id,
            status: req.body.status,
        };
        const orders = await neworder.update_order(
            Number(req.params.id),
            order_info
        );
        res.json(orders);
    } catch (err) {
        res.status(400).json(err);
    }
};

const current_orders = async (_req: Request, res: Response) => {
    try {
        const orders = await neworder.current_orders();
        res.json(orders);
    } catch (err) {
        res.status(400).json(err);
    }
};
const completed_orders = async (_req: Request, res: Response) => {
    try {
        const orders = await neworder.completed_orders();
        res.json(orders);
    } catch (err) {
        res.status(400).json(err);
    }
};
const orderRouter = (app: express.Application) => {
    app.get('/orders', authorizeChecker, current_orders),
        app.get('/orders/completed', authorizeChecker, completed_orders),
        app.post('/orders/', authorizeChecker, create),
        app.patch('/orders/:id', authorizeChecker, update_order);
};

export default orderRouter;
