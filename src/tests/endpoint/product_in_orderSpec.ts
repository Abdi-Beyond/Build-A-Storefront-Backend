import supertest from "supertest";
import app from "../../server"
import {user, User} from "../../models/user";
import {order, Order} from "../../models/order";
import { product, Product } from "../../models/products";
import jwt from "jsonwebtoken";

const request = supertest(app);
let token: string;


describe("Test For Product_order Endpoints", () => {
    beforeAll(async () => {
        const response = await request.post("/users").send({
            password: "test",
            firstname: "test",
            lastname: "test",
        });
       token = jwt.sign({user: response.body}, process.env.TOKEN_SECRET!)
        expect(response.status).toBe(200);
    });

  
  
it ("show product in order", async () => {
    const response = await request.get("/productinorder").set({Authorization: `Bearer ${token}`});
    expect(response.status).toBe(200);
});
it("add product to order", async () => {
    const response = await request.post("/addproducttoorder").send({
        quantity: 2,
        order_id: 1,
        product_id: 1,
    }).set({Authorization: `Bearer ${token}`});
    expect(response.status).toBe(200);
});
it("update product quantity", async () => {
    const response = await request.patch("/updateproductquantity").send({
        quantity: 2,
        order_id: 1,
        product_id: 1,
    }).set({Authorization: `Bearer ${token}`});
    expect(response.status).toBe(200);
});
it("delete product from order", async () => {
    const response = await request.delete("/deleteproductfromorder").send({
        order_id: 1,
        product_id: 1,
    }).set({Authorization: `Bearer ${token}`});
    expect(response.status).toBe(200);
});


});