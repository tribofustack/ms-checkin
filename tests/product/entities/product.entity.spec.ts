import { Product } from 'src/internal/domain/product/entities/product.entity'


describe('Product Entity', () => {
    it('should validate id', async () => {
        try {
            new Product({
                id: null,
                name: "name-test",
                description: "description-test",
                categoryId: "categoryId-test",
                price: 100,
                quantity: 2,
            })
        } catch(err){
            expect(err).toBeTruthy()
            expect(err.message).toEqual('id not found.')
        }
    })
    it('should validate name', async () => {
        try{
            new Product({
                id: "id-test",
                name: null,
                description: "description-test",
                categoryId: "categoryId-test",
                price: 100,
                quantity: 2,
            })
        } catch(err){
            expect(err).toBeTruthy()
            expect(err.message).toEqual('name not found.')
        }
    })
    it('should validate description', async () => {
        try{
            new Product({
                id: "id-test",
                name: "name-test",
                description: null,
                categoryId: "categoryId-test",
                price: 100,
                quantity: 2,
            })
        } catch(err){
            expect(err).toBeTruthy()
            expect(err.message).toEqual('description not found.')
        }
    })
    it('should validate description', async () => {
        try{
            new Product({
                id: "id-test",
                name: "name-test",
                description: "description-test",
                categoryId: null,
                price: 100,
                quantity: 2,
            })
        } catch(err){
            expect(err).toBeTruthy()
            expect(err.message).toEqual('categoryId not found.')
        }
    })
    it('should validate description', async () => {
        try{
            new Product({
                id: "id-test",
                name: "name-test",
                description: "description-test",
                categoryId: "categoryId-test",
                price: -1,
                quantity: 2,
            })
        } catch(err){
            expect(err).toBeTruthy()
            expect(err.message).toEqual('price must be positive.')
        }
    })
    it('should validate description', async () => {
        try{
            new Product({
                id: "id-test",
                name: "name-test",
                description: "description-test",
                categoryId: "categoryId-test",
                price: 1,
                quantity: -2,
            })
        } catch(err){
            expect(err).toBeTruthy()
            expect(err.message).toEqual('quantity must be positive.')
        }
    })
    it('should create a Product', async () => {
        const product =  new Product({
            id: "id-test",
            name: "name-test",
            description: "description-test",
            categoryId: "categoryId-test",
            price: 100,
            quantity: 2,
        })
        expect(product).toBeTruthy()
        expect(product).toBeInstanceOf(Product)
    })
})