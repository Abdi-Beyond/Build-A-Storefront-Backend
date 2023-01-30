import {order , Order} from '../../models/order';

const neworder = new Order();

describe('Test Model Order', () => {
 it ('should return all orders', async () => {
    const result = await neworder.current_orders();
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);

 });

it('should return all completed orders', async () => {
    const result = await neworder.completed_orders();
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
  
    

});

it('should create a new order', async () => {
    const neworders: order = {
        status: '',
        user_id: 1,
    };
    const result = await neworder.create(neworders);
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
}
);
it('should update an order', async () => {
    const neworders: order = {
        status: 'completed',
        user_id: 1,
    };
    const result = await neworder.update_order(1, neworders);
    expect(result).toBeTruthy();
    if (typeof result !== 'string') {
        expect(result.user_id).toBeGreaterThan(0);
     
    } else {
        expect(result).toBe('Order does not exist');
    }

}
);
}

);

