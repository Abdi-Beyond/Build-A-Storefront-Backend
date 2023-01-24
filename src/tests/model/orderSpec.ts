import {order , Order} from '../../models/order';

const neworder = new Order();

describe('Test Model Order', () => {
    it('list all orders', () => {
        expect(neworder.completed_orders).toBeDefined();
    }
    );
    it('list one order', () => {
        expect(neworder.current_orders).toBeDefined();
    }
    );
    it('create a new order', () => {
        expect(neworder.create).toBeDefined();
    }
    );
    it('update an order', () => {
        expect(neworder.update_order).toBeDefined();
    }
    );
    it('delete an order', () => {
        expect(neworder.delete_order).toBeDefined();
    }
    );
}
);

