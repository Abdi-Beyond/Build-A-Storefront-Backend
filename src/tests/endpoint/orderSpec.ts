import supertest from "supertest";
import app from "../../server"
import {user, User} from "../../models/user";
import {order, Order} from "../../models/order";
import jwt from "jsonwebtoken";

const request = supertest(app);

const users: user = {
    password: "test",
    firstname: "test",
    lastname: "test",
}
let token: string;
describe("Order endpoint", () => {
    beforeAll(async () => {
        const response = await request.post("/users").send(users)
        token = jwt.sign({user: response.body}, process.env.TOKEN_SECRET!)
        expect(response.status).toBe(200);
    });

    it ("Get all current orders", async () => {
        const response = await request.get("/orders").set({Authorization: `Bearer ${token}`});
        expect(response.status).toBe(200);
    }
    );
    it ("Completed order", async () => {
        const response = await  request.get("/orders/completed").set({Authorization: `Bearer ${token}`});
        expect(response.status).toBe(200);
    }
    );

  
});