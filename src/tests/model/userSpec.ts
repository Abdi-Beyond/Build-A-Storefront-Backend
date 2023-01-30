import { user, User } from "../../models/user"

const newuser = new User();

describe("Test Model for User", () => {
    it("should return all users", async () => {
        const result = await newuser.index();
        expect(result.length).toBeGreaterThan(0);
        expect(result).toBeTruthy();
    });

    it("should return a user by id", async () => {
        const result = await newuser.show(1);
        if (typeof result !== 'string') {
            expect(result).toBeTruthy();
            expect(result.id).toBeGreaterThan(0);
        }
        else {
            expect(result).toBe('User does not exist');
        }
    });

    it("should create a new user", async () => {
        const newusers: user = {
            firstname: 'test',
            lastname: 'test',
            password: 'test',
        }
        const result = await newuser.create(newusers);
        expect(result).toBeTruthy();
        expect(result.id).toBeGreaterThan(0);

    }
    );
    it("should delete a user", async () => {
        const result = await newuser.delete_user(10);
        
        if (typeof result !== 'string') {
            expect(result.id).toBeGreaterThan(0);
        }
        else{
            expect(result).toBe('User does not exist');
        }
     
    }
    );
    it("should update a user", async () => {
      const newusers: user = {
          firstname: 'test2',
          lastname: 'test2',
          password: 'test2',
      }
      const result = await newuser.update_user(1, newusers);
      expect(result).toBeTruthy();
     
  }

);

});
