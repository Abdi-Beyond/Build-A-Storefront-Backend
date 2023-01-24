import supertest from "supertest";
import app from "../../server"
import { product, Product} from "../../models/products";
import {user, User} from "../../models/user";
import jwt from "jsonwebtoken";


const newproduct = new Product();
const request = supertest(app);
const products: product = {
    name: "test",
    price: 1,
    category: "test",
};
const newproducts: product = {
    name: "test2",
    price: 10,
    category: "Test of test",

};
const users: user = {
   
    password: "test",
    firstname: "test",
    lastname: "test",
}
let token: string;


describe("Test product endpoints.", () => {
    beforeAll(async () => {
        const response = await request.post("/users").send(users)
        token = jwt.sign({user: response.body}, process.env.TOKEN_SECRET!)
        expect(response.status).toBe(200);
        

    });

    it ("Get all products", async () => {
        const response = await request.get("/products");
        expect(response.status).toBe(200);

    }
    );
 

    it ("Add a product", async () => {
        const response = await (await request.post("/products").send(products).set({Authorization: `Bearer ${token}`}));
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("test");
        expect(response.body.price).toBe(1);
        expect(response.body.category).toBe("test");
    }
    
    );
    it ("Get a product", async () => {
        const response = await request.get("/products/1");
        expect(response.status).toBe(200);
        
    }
    );
    it ("Update a product", async () => {
        
        const response = await request.patch("/products/1").send(newproducts).set({Authorization: `Bearer ${token}`});
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("test2");
        expect(response.body.price).toBe(10);
        expect(response.body.category).toBe("Test of test");
    }
    );
    it ("Delete a product", async () => {
        const response = await request.delete("/products/2").set({Authorization: `Bearer ${token}`});
        expect(response.status).toBe(200);
        
    
    });
    it ("Get all products in a category", async () => {
        const response = await request.get("/products/category/test");
        expect(response.status).toBe(200);
    }
    );

});