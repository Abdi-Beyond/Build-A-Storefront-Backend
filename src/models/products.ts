import client from '../database_provider';

export type product = {
    id?: number;
    name: string;
    price: number;
    category: string;
};

export class Product {
    async index(): Promise<product[]> {
        try {
            const query1 = 'SELECT * FROM products';
            const con = await client.connect();
            const result = await con.query(query1);
            con.release();
            return result.rows;
        } catch (err) {
            throw new Error('Could not load products from database: ${err}');
        }
    }
    async show(id: number): Promise<product | string> {
        try {
            const query2 = 'SELECT * FROM products WHERE id=($1)';
            const con = await client.connect();
            const result = await con.query(query2, [id]);
            if (result.rows.length === 0) {
                con.release();
                return 'Product does not exist';
            }
            else{
            con.release();
            return result.rows[0];
            }
        } catch (err) {
            throw new Error('Could not load product from database: ${err}');
        }
    }
    async create(newproduct: product): Promise<product> {
        try {
            const query3 =
                'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *';
            const con = await client.connect();
            const result = await con.query(query3, [
                newproduct.name,
                newproduct.price,
                newproduct.category,
            ]);
            con.release();
            return result.rows[0];
        } catch (err) {
            throw new Error('Could not add new product to database: ${err}');
        }
    }
    async update_product(
        id: number,
        newproduct: product
    ): Promise<product | string> {
        try {
            const query = 'SELECT * FROM products WHERE id=($1)';
            const query4 =
                'UPDATE products SET name=($1), price=($2), category=($3) WHERE id=($4) RETURNING *';
            const con = await client.connect();
            const result1 = await con.query(query, [id]);
            if (result1.rows.length === 0) {
                con.release();
                return 'Product does not exist';
            }
            const result2 = await con.query(query4, [
                newproduct.name,
                newproduct.price,
                newproduct.category,
                id,
            ]);
            con.release();
            return result2.rows[0];
        } catch (err) {
            throw new Error('Could not update product in database: ${err}');
        }
    }
    async delete_product(id: number): Promise<product | string> {
        try {
            const query = 'SELECT * FROM products WHERE id=($1)';
            const query5 = 'DELETE FROM products WHERE id=($1)';
            const con = await client.connect();
            const result1 = await con.query(query, [id]);
            if (result1.rows.length === 0) {
                con.release();
                return 'Product does not exist';
            }
            const result2 = await con.query(query5, [id]);
            con.release();
            return result2.rows[0];
        } catch (err) {
            throw new Error('Could not delete product from database: ${err}');
        }
    }

    async category_products(category: string): Promise<product[] | string> {
        try {
            const query6 = 'SELECT * FROM products WHERE category=($1)';
            const con = await client.connect();
            const result = await con.query(query6, [category]);
            if (result.rows.length === 0) {
                con.release();
                return 'No products in this category';
            }
            con.release();
            return result.rows;
        } catch (err) {
            throw new Error('Could not load products from database: ${err}');
        }
    }

    async popular_products(): Promise<product[]> {
        try {
            const query7 =
                'SELECT * FROM orders GROUP BY product_id ORDER BY COUNT(*) DESC LIMIT 3';
            const con = await client.connect();
            const result = await con.query(query7);
            con.release();
            return result.rows;
        } catch (err) {
            throw new Error('Could not load products from database: ${err}');
        }
    }
}
