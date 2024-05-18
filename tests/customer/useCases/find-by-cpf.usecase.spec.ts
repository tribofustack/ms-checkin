import { FindCustomerByCpf } from 'src/internal/application/useCases/customer/find-by-cpf.usecase';
import { makeCustomerRepository } from 'tests/stubs/customer-repository.stub';

const makeSut = () => {
    const customerRepository = makeCustomerRepository()
    const findCustomerByCpf = new FindCustomerByCpf(customerRepository)
    return {
        customerRepository,
        findCustomerByCpf,
    }
}

describe('Find Customer By Cpf Use Case', () => {
    it('should return existing customer', async () => {      
        const { customerRepository, findCustomerByCpf } = makeSut()
        const findByCpfSpy = jest.spyOn(customerRepository, 'findByCpf')

        const cpfMock = "25896374100"

        const customer = await findCustomerByCpf.execute(cpfMock)

        expect(findByCpfSpy).toBeCalled()
        expect(findByCpfSpy).toBeCalledWith(cpfMock)
        expect(customer).toBeTruthy()
    });
    it('should throw NotFoundException when customer not exists', async () => {      
        const { customerRepository, findCustomerByCpf } = makeSut()
        jest.spyOn(customerRepository, 'findByCpf').mockReturnValueOnce(null)

        const cpfMock = "25896374100"

        try {
            await findCustomerByCpf.execute(cpfMock)
        } catch(err) {
            expect(err).toBeTruthy()
            expect(err.message).toEqual('Customer not found')
        }  

    });
});
