import { CreateCustomer } from 'src/internal/application/useCases/customer/create-customer.usecase';
import { Customer } from 'src/internal/domain/customers/entities/customer.entity';
import { makeCustomerRepository } from 'tests/stubs/customer-repository.stub';
import { makeIdGenerator } from 'tests/stubs/id-generator.stub';


const makeSut = () => {
    const customerRepository = makeCustomerRepository()
    const idGenerator = makeIdGenerator()
    const createCustomer = new CreateCustomer(customerRepository, idGenerator)

    return {
        customerRepository,
        idGenerator,
        createCustomer,
    }
}

describe('Create Customer Use Case', () => {
    it('should call customerRepository.findOneByCpfOrEmail with correct params', async () => {      
        const { customerRepository, createCustomer } = makeSut()
        const findOneByCpfOrEmailSpy = jest
            .spyOn(customerRepository, 'findOneByCpfOrEmail')
            .mockReturnValueOnce(Promise.resolve({ name: "name-test", id: "id-test" } as Customer))

        const customerDtoMock = {
            name: 'name-test',
            email: 'email-test',
            cpf: 'cpf-test',
        }

        await createCustomer.execute(customerDtoMock)

        expect(findOneByCpfOrEmailSpy).toBeCalledWith(
            customerDtoMock.cpf,
            customerDtoMock.email,
        )
    });
    it('should create if customer not exists yet', async () => {   
        const { customerRepository, createCustomer, idGenerator } = makeSut()
        jest.spyOn(customerRepository, 'findOneByCpfOrEmail').mockReturnValueOnce(null)
        const createSpy = jest.spyOn(customerRepository, 'create')
        const generateSpy = jest.spyOn(idGenerator, 'generate')

        const customerDtoMock = {
            name: 'name-test',
            email: 'email-test',
            cpf: 'cpf-test',
        }

        const customer = await createCustomer.execute(customerDtoMock)

        expect(createSpy).toBeCalled()
        expect(generateSpy).toBeCalled()
        expect(customer).toBeTruthy()
    });
    it('should update customer', async () => {      
        const { customerRepository, createCustomer } = makeSut()
        const updateSpy = jest.spyOn(customerRepository, 'update')

        const customerDtoMock = {
            name: 'name-test',
            email: 'email-test',
            cpf: 'cpf-test',
        }

        await createCustomer.execute(customerDtoMock)

        expect(updateSpy).toBeCalled()
    });
});
