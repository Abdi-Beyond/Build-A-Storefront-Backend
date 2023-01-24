import bcrypt from 'bcrypt';
import client from '../database_provider';

const pepper = process.env.BCRYPT_PASSWORD;

export class Auth_user {
    async authenticate(username: string, password: string): Promise<boolean> {
        try {
            const query1 = 'SELECT password FROM users WHERE firstname=($1)';
            const con = await client.connect();
            const result = await con.query(query1, [username]);
            con.release();
            if (result.rows.length) {
                return bcrypt.compareSync(
                    password + pepper,
                    result.rows[0].password
                );
            } else {
                return false;
            }
        } catch (err) {
            throw new Error('Could not authenticate user: ${err}');
        }
    }
}
