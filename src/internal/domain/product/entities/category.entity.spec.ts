import { AttributeException } from 'src/internal/application/errors';

import { ICategory, Category } from './category.entity';

describe('Category Entity', () => {
  describe('validate', () => {
    it('should validate id', () => {
      // arrange
      let category: ICategory;
      try {
        // act
        category = new Category({
          id: null,
          name: 'Lanche',
          description: 'description-test',
        });
      } catch (error) {
        // assert
        expect(error).toBeTruthy();
        expect(error.message).toBe('id not found.');
        expect(error).toBeInstanceOf(AttributeException);
      }
      expect(category).toBeFalsy();
    });
    it('should validate name', () => {
      let category: ICategory;
      try {
        category = new Category({
          id: 'id-test',
          name: null,
          description: 'description-test',
        });
      } catch (error) {
        expect(error).toBeTruthy();
        expect(error.message).toBe('name not found.');
        expect(error).toBeInstanceOf(AttributeException);
      }
      expect(category).toBeFalsy();
    });
    it('should validate description', () => {
      let category: ICategory;
      try {
        category = new Category({
          id: 'id-test',
          name: 'Lanche',
          description: null,
        });
      } catch (error) {
        expect(error).toBeTruthy();
        expect(error.message).toBe('description not found.');
        expect(error).toBeInstanceOf(AttributeException);
      }
      expect(category).toBeFalsy();
    });
  });
});
