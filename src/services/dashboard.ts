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
            
            const query2 =
                'SELECT * FROM products INNER JOIN order_product ON products.id=order_product.product_id  ORDER BY order_product.order_id';
            const con = await client.connect();
            con.release();
            try {
                const result = await con.query(query2);
                return result.rows;
            } catch (err) {
                return 'unable to load products';
            }
        } catch (err) {
            throw new Error('Could not load product from database: ${err}');
        }
    }
    async addproducttorder(
        neworder: productorder
    ): Promise<productorder | string> {
        try {
            const query1 =
                'INSERT INTO order_product(order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
            const con = await client.connect();

            const result = await con.query(query1, [
                neworder.order_id,
                neworder.product_id,
                neworder.quantity,
            ]);

            con.release();
            if (result.rows.length === 0) {
                return 'cant add product;';
            }
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
            try {
                const result2 = await con.query(query2, [order_id, product_id]);
                if (result2.rows.length === 0) {
                    return 'cant delete product';
                }
                con.release();
                return result2.rows[0];
            } catch (err) {
                return 'cant delete product';
            }
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
            try {
                const result = await con.query(query3, [
                    updateproorder.quantity,
                    updateproorder.order_id,
                    updateproorder.product_id,
                ]);
                con.release();
                return result.rows[0];
            } catch (err) {
                return 'cant update product';
            }
        } catch (err) {
            throw new Error('Could not update product quantity : ${err}');
        }
    }
}
