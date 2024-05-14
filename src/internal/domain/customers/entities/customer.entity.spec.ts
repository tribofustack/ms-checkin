import { AttributeException } from 'src/internal/application/errors';

import { ICustomer, Customer } from './customer.entity';

describe('Customer Entity', () => {
  describe('validate', () => {
    it('should validate id', () => {
      // arrange
      let customer: ICustomer;
      try {
        // act
        customer = new Customer({
          id: null,
          name: 'Lanche',
          email: 'test@test.com',
          cpf: '1234567890',
        });
      } catch (error) {
        // assert
        expect(error).toBeTruthy();
        expect(error.message).toBe('id not found.');
        expect(error).toBeInstanceOf(AttributeException);
      }
      expect(customer).toBeFalsy();
    });
  });
});
