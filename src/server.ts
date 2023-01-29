import express , {Request, Response} from 'express';
import bodyParser from 'body-parser';
import userRouter from './handlers/user_handler';
import productRouter from './handlers/product_handler';
import orderRouter from './handlers/order_handler';
import productinorderRouter from './handlers/product_in_order';

const app: express.Application = express();

app.use(bodyParser.json())
app.get("/", (_req: Request, res: Response) => {
    res.send("Hello World")
});
userRouter(app);
productRouter(app);
orderRouter(app);
productRouter(app);
productinorderRouter(app);
if (process.env.NODE_ENV === 'test') {
    app.listen(3000, () => {
        console.log("starting app on: 50005");
    });
}
    else {
app.listen(50000, () => {
    console.log("starting app on: 0.0.0.0:3000");
}); 
    }

export default app;