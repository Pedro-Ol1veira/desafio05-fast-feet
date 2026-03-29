import { CustomerRepository } from "@/domain/carrier/application/repositories/CustomerRepository";
import { Customer } from "@/domain/carrier/enterprise/entities/Customer";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaCustomerMapper } from "../mappers/PrismaCustomerMapper";


@Injectable()
export class PrismaCustomerRepository implements CustomerRepository {

    constructor(private prisma: PrismaService) {}
    
    async create(customer: Customer): Promise<void> {
        const data = PrismaCustomerMapper.toPrisma(customer);

        await this.prisma.user.create({
            data: {
                ...data,
                role: 'CUSTOMER'
            }
        });
    }
    async findByCpf(cpf: string): Promise<Customer | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                cpf,
                role: 'CUSTOMER'
            }
        });

        if(!user) return null;

        return PrismaCustomerMapper.toDomain(user);
    }
    async findById(id: string): Promise<Customer | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
                role: 'CUSTOMER'
            }
        });

        if(!user) return null;

        return PrismaCustomerMapper.toDomain(user);
    }
    async delete(customer: Customer): Promise<void> {
        await this.prisma.user.delete({
            where: {
                id: customer.id.toString(),
                role: 'CUSTOMER'
            }
        });
    }
    async save(customer: Customer): Promise<void> {
        const data = PrismaCustomerMapper.toPrisma(customer);

        await this.prisma.user.update({
            where: {
                id: customer.id.toString(),
                role: 'CUSTOMER'
            },
            data
        });
    }

}