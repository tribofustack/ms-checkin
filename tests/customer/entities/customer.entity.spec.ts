import { Customer } from 'src/internal/domain/customers/entities/customer.entity'

describe('Customer Entity', () => {

    it('should validate id', async () => {
        try {
            new Customer({
                id: null,
                name: "name-test",
                email: "email-test",
                cpf: "cpf-test",
            })
        } catch(err){
            expect(err).toBeTruthy()
            expect(err.message).toEqual('id not found.')
        }
    })

    it('should create a customer', async () => {
        const customer =  new Customer({
            id: "id-test",
            name: "name-test",
            email: "email-test",
            cpf: "cpf-test",
        })
        expect(customer).toBeTruthy()
        expect(customer).toBeInstanceOf(Customer)
    })
})