import { user, User } from "../../models/user"

const newuser = new User();

describe("Test Model for User", () => {
    it('list all users', () => {
        expect(newuser.index).toBeDefined();
      });

    it('list on user', () => {
        expect(newuser.show).toBeDefined();
      });

    it('create a new user', () => {
        expect(newuser.create).toBeDefined();
      }
    );
    it('update a user', () => {
        expect(newuser.update_user).toBeDefined();
      }
    );
    it('delete a user', () => {
        expect(newuser.delete_user).toBeDefined();
      }
    );
   
});
