import client from '../database_provider';
import bcrypt from 'bcrypt';

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
export type user = {
    id?: number;
    firstname: string;
    lastname: string;
    password: string;
};

export class User {
    async index(): Promise<user[]> {
        try {
            const query1 = 'SELECT * FROM users';
            const con = await client.connect();
            const result = await con.query(query1);
            con.release();
            return result.rows;
        } catch (err) {
            throw new Error('Could not load users from database: ${err}');
        }
    }

    async show(id: number): Promise<user | string> {
        try {
            const query2 = 'SELECT * FROM users WHERE id=($1)';
            const con = await client.connect();
            const result = await con.query(query2, [id]);
            if (result.rows.length === 0) {
                return 'User does not exist';
            } else {
                con.release();
                return result.rows[0];
            }
        } catch (err) {
            throw new Error('Could not load user from database: ${err}');
        }
    }

    async create(newuser: user): Promise<user> {
        try {
            newuser.password = bcrypt.hashSync(
                newuser.password + pepper,
                Number(saltRounds)
            );
            const query3 =
                'INSERT INTO users (firstname, lastname, password) VALUES ($1, $2, $3) RETURNING *';
            const con = await client.connect();
            const result = await con.query(query3, [
                newuser.firstname,
                newuser.lastname,
                newuser.password,
            ]);
            con.release();
            return result.rows[0];
        } catch (err) {
            throw new Error('Could not add new user to database: ${err}');
        }
    }

    async update_user(id: number, newuser: user): Promise<user | string> {
        try {
            const query = 'SELECT * FROM users WHERE id=($1)';
            const query4 =
                'UPDATE users SET firstname=($1), lastname=($2), password=($3) WHERE id=($4) RETURNING *';
            const con = await client.connect();
            const result1 = await con.query(query, [id]);
            if (result1.rows.length === 0) {
                con.release();
                return 'User does not exist';
            }
            newuser.password = bcrypt.hashSync(
                newuser.password + pepper,
                Number(saltRounds)
            );
            const result2 = await con.query(query4, [
                newuser.firstname,
                newuser.lastname,
                newuser.password,
                id,
            ]);
            con.release();
            return result2.rows[0];
        } catch (err) {
            throw new Error('Could not update user in database: ${err}');
        }
    }

    async delete_user(id: number): Promise<user | string> {
        try {
            const query = 'SELECT * FROM users WHERE id=($1)';
            const query5 = 'DELETE FROM users WHERE id=($1) RETURNING *';
            const con = await client.connect();
            const result1 = await con.query(query, [id]);
            if (result1.rows.length === 0) {
                con.release();
                return 'User does not exist';
            }
            const result2 = await con.query(query5, [id]);
            con.release();
            return result2.rows[0];
        } catch (err) {
            throw new Error('Could not delete user from database: ${err}');
        }
    }
}
