import { product, Product } from "../../models/products";

const newproduct = new Product();

describe("Test Model for Product", () => {
 it("should return all products", async () => {
  const result = await newproduct.index();
  expect
  expect(result.length).toBeGreaterThan(0);
  expect(result).toBeTruthy();
  });
 
 it ("should return a product by id", async () => {
    const result = await newproduct.show(1);
    if (typeof result !== 'string') {
        expect(result).toBeTruthy();
        expect(result.id).toBeGreaterThan(0);
    }
    else{
        expect(result).toBe('Product does not exist');
    }
    
    
    });

    it ("should create a new product", async () => {
        const newproducts: product = {
            name: 'test',
            price: 1,
            category: 'test',
        };
        const result = await newproduct.create(newproducts);
        expect(result).toBeTruthy();
        expect(result.id).toBeGreaterThan(0);
    }
    );
it ("should delete a product", async () => {
    const result = await newproduct.delete_product(1);
    expect(result).toBeTruthy();
    if (typeof result !== 'string') {
        expect(result).toBeGreaterThan(0);
    }
    else {
        expect(result).toBe('Product does not exist');
    }
}
);
it ("should update a product", async () => {
    const newproducts: product = {
        name: 'test',
        price: 2,
        category: 'test',
    };
    const result = await newproduct.update_product(1, newproducts);
    expect(result).toBeTruthy();
    if (typeof result !== 'string') {
        expect(result).toBeGreaterThan(0);
    }
    else {
        expect(result).toBe('Product does not exist');
    }
}


);
it ("should delete a product", async () => {
    const result = await newproduct.delete_product(2);
    expect(result).toBeTruthy();
    if (typeof result !== 'string') {
        expect(result).toBeGreaterThan(0);
    }
    else {
        expect(result).toBe('Product does not exist');
    }
}
);
}
);