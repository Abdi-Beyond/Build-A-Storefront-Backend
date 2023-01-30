import client from '../database_provider';

export type order = {
    id?: number;
    status: string;
    user_id: number;
};
export class Order {
    async current_orders(): Promise<order[] | string> {
        try {
            const query1 = 'SELECT * FROM orders WHERE status=($1)';
            const con = await client.connect();

            const result = await con.query(query1, ['active']);
            if (result.rows.length === 0) {
                con.release();
                return 'No active orders';
            }
            con.release();
            return result.rows;
        } catch (err) {
            throw new Error('Could not load orders from database: ${err}');
        }
    }
    async completed_orders(): Promise<order[] | string> {
        try {
            const query2 = 'SELECT * FROM orders WHERE status=($1)';
            const con = await client.connect();
            const result = await con.query(query2, ['completed']);
            if (result.rows.length === 0) {
                con.release();
                return 'No completed orders';
            }

            con.release();
            return result.rows;
        } catch (err) {
            throw new Error('Could not load orders from database: ${err}');
        }
    }
    async create(neworder: order): Promise<order[] | string> {
        try {
            const query = 'select * from users where id=($1)';
            const con = await client.connect();
            const result1 = await con.query(query, [neworder.user_id]);
            if (result1.rows.length === 0) {
                con.release();
                return 'User does not exist';
            }
            const query3 =
                'INSERT INTO orders (user_id, status)VALUES ($1, $2) RETURNING *';

            const result = await con.query(query3, [
                neworder.user_id,
                neworder.status,
            ]);
            con.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not add new order to database: ${err}`);
        }
    }
    async update_order(id: number, neworder: order): Promise<order | string> {
        try {
            const query = 'SELECT * FROM orders WHERE id=($1)';
            const query4 =
                'UPDATE orders SET status=($1), user_id=($2) WHERE id=($3) RETURNING *';
            const con = await client.connect();
            const result1 = await con.query(query, [id]);
            if (result1.rows.length === 0) {
                con.release();
                return 'Order does not exist';
            }
            const result2 = await con.query(query4, [
                neworder.status,
                neworder.user_id,
                id,
            ]);
            con.release();
            return result2.rows[0];
        } catch (err) {
            throw new Error('Could not update order in database: ${err}');
        }
    }
    async delete_order(id: number): Promise<order | string> {
        try {
            const query = 'SELECT * FROM orders WHERE id=($1)';
            const query5 = 'DELETE FROM orders WHERE id=($1)';
            const con = await client.connect();
            const result1 = await con.query(query, [id]);
            if (result1.rows.length === 0) {
                con.release();
                return 'Order does not exist';
            }
            const result2 = await con.query(query5, [id]);
            con.release();
            return result2.rows[0];
        } catch (err) {
            throw new Error('Could not delete order from database: ${err}');
        }
    }
}
