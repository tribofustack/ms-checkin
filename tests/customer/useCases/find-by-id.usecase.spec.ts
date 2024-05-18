import { FindCustomerById } from 'src/internal/application/useCases/customer/find-by-id.usecase';
import { makeCustomerRepository } from 'tests/stubs/customer-repository.stub';

const makeSut = () => {
    const customerRepository = makeCustomerRepository()
    const findCustomerById = new FindCustomerById(customerRepository)
    return {
        customerRepository,
        findCustomerById,
    }
}

describe('Find Customer By Id Use Case', () => {
    it('should return existing customer', async () => {      
        const { customerRepository, findCustomerById } = makeSut()
        const findOneSpy = jest.spyOn(customerRepository, 'findOne')

        const cpfMock = "25896374100"

        const customer = await findCustomerById.execute(cpfMock)

        expect(findOneSpy).toBeCalled()
        expect(findOneSpy).toBeCalledWith(cpfMock)
        expect(customer).toBeTruthy()
    });
    it('should throw NotFoundException when customer not exists', async () => {      
        const { customerRepository, findCustomerById } = makeSut()
        jest.spyOn(customerRepository, 'findOne').mockReturnValueOnce(null)

        const cpfMock = "25896374100"

        try {
            await findCustomerById.execute(cpfMock)
        } catch(err) {
            expect(err).toBeTruthy()
            expect(err.message).toEqual('Customer not found')
        }  

    });
});
