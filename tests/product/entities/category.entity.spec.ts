import { Category } from 'src/internal/domain/product/entities/category.entity'


describe('Category Entity', () => {

    it('should validate id', async () => {
        try {
            new Category({
                id: null,
                name: "Bebida",
                description: "description-test"
            })
        } catch(err){
            expect(err).toBeTruthy()
            expect(err.message).toEqual('id not found.')
        }
    })
    it('should validate name', async () => {
        try{
            new Category({
                id: "id-test",
                name: null,
                description: "description-test"
            })
        } catch(err){
            expect(err).toBeTruthy()
            expect(err.message).toEqual('name not found.')
        }
    })
    it('should validate description', async () => {
        try{
            new Category({
                id: "id-test",
                name: "Acompanhamento",
                description: null
            })
        } catch(err){
            expect(err).toBeTruthy()
            expect(err.message).toEqual('description not found.')
        }
    })

    it('should create a category', async () => {
        const category =  new Category({
            id: "id-test",
            name: "Lanche",
            description: "description-test"
        })
        expect(category).toBeTruthy()
        expect(category).toBeInstanceOf(Category)
    })
})