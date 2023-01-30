import supertest from "supertest";
import app from "../../server"
import {user, User} from "../../models/user";
import {order, Order} from "../../models/order";
import jwt from "jsonwebtoken";

const request = supertest(app);
const neworder: order = {
    user_id : 2,
    status: "test2",
}
const o: order = {
    user_id : 1,
    status: "test",
}
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
    it ("Create order ", async() => {
        const response = await request.post("/orders").send(o).set({Authorization: `Bearer ${token}`});
        expect(response.status).toBe(200);
        if (response.body.id === 1) {
      
        
            expect(response.body.message).toBe("User does not exist");
        }
    }
    );

    
    it ("Update order", async () => {
        const response = await request.patch("/orders/1").send(o).set({Authorization: `Bearer ${token}`});
        expect(response.status).toBe(200);

    }
    );
    
    it("Delete", async () => {
        const response = await request.delete("/orders/1").set({Authorization: `Bearer ${token}`});
        expect(response.status).toBe(200)
    }
    );
  
});