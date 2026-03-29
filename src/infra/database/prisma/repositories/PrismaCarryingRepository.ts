import { CarryingRepository } from "@/domain/carrier/application/repositories/CarryingRepository";
import { Carrying } from "@/domain/carrier/enterprise/entities/Carrying";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaCarryingMapper } from "../mappers/PrismaCarryingMapper";

@Injectable()
export class PrismaCarryngRepository implements CarryingRepository {

    constructor(private prisma: PrismaService) {}

    async create(carrying: Carrying): Promise<void> {
        const data = PrismaCarryingMapper.toPrisma(carrying);

        await this.prisma.user.create({
            data: {
                ...data,
                role: 'CARRYING'
            }
        });
    }
    async findByCpf(cpf: string): Promise<Carrying | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                cpf,
                role: 'CARRYING'
            }
        });

        if(!user) return null;
        
        return PrismaCarryingMapper.toDomain(user);
    }
    async findById(id: string): Promise<Carrying | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
                role: 'CARRYING'
            }
        });

        if(!user) return null;
        
        return PrismaCarryingMapper.toDomain(user);
    }
    async delete(carrying: Carrying): Promise<void> {
        await this.prisma.user.delete({
            where: {
                id: carrying.id.toString(),
                role: 'CARRYING'
            }
        });
    }
    async save(carrying: Carrying): Promise<void> {
        const data = PrismaCarryingMapper.toPrisma(carrying);

        await this.prisma.user.update({
            where: {
                id: carrying.id.toString()
            },
            data
        });
    }
    
    

}