import client from '../database_provider';

export type productorder = {
    id?: number;
    quantity: number;
    order_id: number;
    product_id: number;
};

export class Dashboard {
    async productsinorder(): Promise<any> {
        try {
            const query =
                'SELECT * FROM products INNER JOIN order_product ON products.id = order_product.product_id';
            const con = await client.connect();
            const result = await con.query(query);
            con.release();
            return result.rows;
        } catch (err) {
            throw new Error('Could not load product from database: ${err}');
        }
    }
    async addproducttoorder(
        newproductorder: productorder
    ): Promise<productorder> {
        try {
            const query1 =
                'INSERT INTO order_product (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *';
            const con = await client.connect();
            const result = await con.query(query1, [
                newproductorder.quantity,
                newproductorder.order_id,
                newproductorder.product_id,
            ]);
            con.release();
            return result.rows[0];
        } catch (err) {
            throw new Error('Could not add new product to order : ${err}');
        }
    }
    async deleteproductfromorder(
        order_id: number,
        product_id: number
    ): Promise<productorder | string> {
        try {
            const query2 =
                'DELETE FROM order_product WHERE order_id=($1) and product_id=($2) RETURNING *';
            const con = await client.connect();

            const result2 = await con.query(query2, [order_id, product_id]);
            con.release();
            return result2.rows[0];
        } catch (err) {
            throw new Error('Could not delete product from order : ${err}');
        }
    }
    async updateproductquantity(
        updateproorder: productorder
    ): Promise<productorder | string> {
        try {
            const query3 =
                'UPDATE order_product SET quantity=($1) WHERE order_id=($2) and product_id=($3) RETURNING *';
            const con = await client.connect();
            const result = await con.query(query3, [
                updateproorder.quantity,
                updateproorder.order_id,
                updateproorder.product_id,
            ]);
            con.release();
            return result.rows[0];
        } catch (err) {
            throw new Error('Could not update product quantity : ${err}');
        }
    }
}
