import { CustomerEntity } from './entities/customer.entity';

describe('CustomerEntity', () => {
  it('should be defined', () => {
    expect(new CustomerEntity()).toBeDefined();
  });
});
