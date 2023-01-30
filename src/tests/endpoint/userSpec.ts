import supertest from "supertest";
import app from "../../server"
import {user, User} from "../../models/user";
import jwt from "jsonwebtoken";

const users: user = {
   
    password: "test",
    firstname: "test",
    lastname: "test",
}
const users2: user = {
    password: "test2",
    firstname: "test2",
    lastname: "test2",
}
let token: string;
const request = supertest(app)

describe("Test User endpoints.", () => {
    beforeAll(async () => {
        const response = await request.post("/users").send(users)
        token = jwt.sign({user: response.body}, process.env.TOKEN_SECRET!)
        expect(response.status).toBe(200);
        
    });
    it ("Get all users", async () => {
        const response = await  request.get("/users").set({Authorization: `Bearer ${token}`});
        expect(response.status).toBe(200);
    }
    );

    
    it ("Get a user", async () => {
        const response = await request.get("/users/1").set({Authorization: `Bearer ${token}`});
        expect(response.status).toBe(200);
        
    }
    );
    it ("Update a user", async () => {
        
        const response = await request.patch("/users/2").send(users2).set({Authorization: `Bearer ${token}`});
        expect(response.status).toBe(200);
        
        
    }
    );
    it ("Delete a user", async () => {
        const response = await request.delete("/users/2").set({Authorization: `Bearer ${token}`});

        expect(response.status).toBe(200);
        
    
    });


}
);