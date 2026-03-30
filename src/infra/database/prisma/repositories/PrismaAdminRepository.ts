import { AdminRepository } from "@/domain/carrier/application/repositories/AdminRepository";
import { Admin } from "@/domain/carrier/enterprise/entities/Admin";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaAdminMapper } from "../mappers/PrismaAdminMapper";

@Injectable()
export class PrismaAdminRepository implements AdminRepository {

    constructor(private prisma: PrismaService) {}
    
    async findByCpf(cpf: string): Promise<Admin | null> {
        const admin = await this.prisma.user.findUnique({
            where: {
                cpf,
                role: 'ADMIN'
            }
        });

        if(!admin) return null;

        return PrismaAdminMapper.toDomain(admin);
    }

}