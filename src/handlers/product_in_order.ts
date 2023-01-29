import express, { Request, Response } from 'express';
import { Dashboard, productorder } from '../services/dashboard';
import { authorizeChecker } from '../middleware/authrize_checker_jwt';


const dashboard = new Dashboard();

const productinorder = async (_req: Request, res: Response) => {
    try {
        const products = await dashboard.productsinorder();
        res.json(products);
    } catch (err) {
        res.status(400).json(err);
    }
};
const addproducttorder = async (req: Request, res: Response) => {
    try {
        const pro: productorder = {
            order_id: req.body.order_id,
            product_id: req.body.product_id,
            quantity: req.body.quantity,
        };
        const products = await dashboard.addproducttorder(pro);
        res.json(products);
    } catch (err) {
        res.status(400).json(err);
    }
};

const updateproductquantity = async (req: Request, res: Response) => {
    try {
        const pro = {
            quantity: req.body.quantity,
            order_id: req.body.order_id,
            product_id: req.body.product_id,
        };
        const products = await dashboard.updateproductquantity(pro);
        res.json(products);
    } catch (err) {
        res.status(400).json(err);
    }
};
const deleteproductfromorder = async (req: Request, res: Response) => {
    try {
        const products = await dashboard.deleteproductfromorder(
            req.body.order_id,
            req.body.product_id
        );
        res.json(products);
    } catch (err) {
        res.status(400).json(err);
    }
};

const productinorderRouter = (app: express.Application) => {
    app.get('/productinorder', authorizeChecker, productinorder),
        app.patch(
            '/updateproductquantity',
            authorizeChecker,
            updateproductquantity
        ),
        app.delete(
            '/deleteproductfromorder',
            authorizeChecker,
            deleteproductfromorder
        ),
        app.post('/addproducttorder', authorizeChecker, addproducttorder);
};
export default productinorderRouter;
