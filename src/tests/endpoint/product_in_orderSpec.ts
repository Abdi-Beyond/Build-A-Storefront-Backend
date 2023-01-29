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
       let response = await request.post("/users").send({
            password: "test",
            firstname: "test",
            lastname: "test",
        });
        expect(response.status).toBe(200);
        token = jwt.sign({user: response.body}, process.env.TOKEN_SECRET!)
         

        response = await request.post("/products").send({
            name: "test",
            price: 1,
            category: "test",
        }).set({Authorization: `Bearer ${token}`});
         expect(response.status).toBe(200);
        response = await request.post("/orders").send({
            user_id: 1,
            status: "test",
        }).set({Authorization: `Bearer ${token}`});
        expect(response.status).toBe(200);
       
    });

it("add product to order", async () => {
    const response = await request.post("/addproducttoorder").send({
        quantity: 1,
        order_id: 1,
        product_id: 1,
    }).set({Authorization: `Bearer ${token}`});

});
  
it ("show product in order", async () => {
    const response = await request.get("/productinorder").set({Authorization: `Bearer ${token}`});
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