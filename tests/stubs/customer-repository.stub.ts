import { Customer } from 'src/internal/domain/customers/entities/customer.entity';
import { ICustomerRepository } from 'src/internal/domain/customers/repositories/customer.repository';

export const makeCustomerRepository = (): ICustomerRepository => {
    class CustomerRepositoryStub implements ICustomerRepository {
        async findByCpf(cpf: string): Promise<Customer> {
            return Promise.resolve({
                id: 'id-test',
                name: 'name-test',
                email: 'email-test',
                cpf,
            } as Customer)
        }
        async findOneByCpfOrEmail(cpf?: string, email?: string): Promise<Customer> {
            return Promise.resolve({
                id: "id-mock",
                name: "name-mock",
                email: "email-mock",
                cpf: "cpf-mock",
            } as Customer)
        }
        async findOne(id: string): Promise<Customer> {
            return Promise.resolve({
                id,
                name: 'name-test',
                email: 'email-test',
                cpf: 'cpf-test',
            } as Customer)
        }
        findAll(): Promise<Customer[]> {
            throw new Error('Method not implemented.');
        }
        async create(params: Partial<Customer>): Promise<void | Customer> {
            //
        }
        delete(id: string): Promise<void> {
            throw new Error('Method not implemented.');
        }
        async update(id: string, params: Partial<Customer>): Promise<void> {
            //
        }

    }

    return new CustomerRepositoryStub()
}