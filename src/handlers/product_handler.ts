import express, { Request, Response } from 'express';
import { authorizeChecker } from '../middleware/authrize_checker_jwt';
import { product, Product } from '../models/products';

const newproduct = new Product();
const index = async (_req: Request, res: Response) => {
    try {
        const products = await newproduct.index();
        res.json(products);
    } catch (err) {
        res.status(400).json(err);
    }
};
const show = async (req: Request, res: Response) => {
    try {
        const products = await newproduct.show(Number(req.params.id));
        res.json(products);
    } catch (err) {
        res.status(400).json(err);
    }
};
const create = async (req: Request, res: Response) => {
    try {
        const product_info: product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        };
        const products = await newproduct.create(product_info);
        res.json(products);
    } catch (err) {
        res.status(400).json(err);
    }
};
const delete_product = async (req: Request, res: Response) => {
    try {
        const products = await newproduct.delete_product(Number(req.params.id));
        res.json(products);
    } catch (err) {
        res.status(400).json(err);
    }
};

const update_product = async (req: Request, res: Response) => {
    try {
        const product_info: product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        };
        const products = await newproduct.update_product(
            Number(req.params.id),
            product_info
        );
        res.json(products);
    } catch (err) {
        res.status(400).json(err);
    }
};
const category_products = async (req: Request, res: Response) => {
    try {
        const products = await newproduct.category_products(
            req.params.category
        );
        res.json(products);
    } catch (err) {
        res.status(400).json(err);
    }
};

const popular_products = async (req: Request, res: Response) => {
    try {
        const popular = await newproduct.popular_products();
        res.json(popular);
    } catch (err) {
        res.status(400).json(err);
    }
};
const productRouter = (app: express.Application) => {
    app.get('/products', index),
        app.get('/products/:id', show),
        app.post('/products/', authorizeChecker, create),
        app.delete('/products/:id', authorizeChecker, delete_product),
        app.patch('/products/:id', authorizeChecker, update_product),
        app.get('/products/category/:category', category_products),
        app.get('/products/popular/', popular_products);
};

export default productRouter;
