import { product, Product } from "../../models/products";

const newproduct = new Product();

describe("Test Model for Product", () => {
    it('list all products', () => {
        expect(newproduct.index).toBeDefined();
      }
    );  
    it('list one product', () => {
        expect(newproduct.show).toBeDefined();
      }
    );
    it('create a new product', () => {
        expect(newproduct.create).toBeDefined();
      }
    );
    it('update a product', () => {
        expect(newproduct.update_product).toBeDefined();
      }
    );
    it('delete a product', () => {
        expect(newproduct.delete_product).toBeDefined();
      }
    );
    it('list by category', () => {
        expect(newproduct.category_products).toBeDefined();

        }
    
    );
    it ('popularity', () => {
        expect(newproduct.popular_products).toBeDefined();
    }
    );
}
);
