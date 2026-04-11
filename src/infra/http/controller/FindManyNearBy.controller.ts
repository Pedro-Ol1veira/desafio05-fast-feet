import { Controller, Get, HttpCode, Query, UseGuards } from "@nestjs/common";
import { OrderPresenter } from "../presenter/OrderPresenter";
import { Roles } from "@/infra/auth/RolesDecorator";
import { Role } from '@/infra/auth/RolesDecorator';
import { JwtAuthGuard } from "@/infra/auth/JwtAuth.guard";
import { RoleGuard } from "@/infra/auth/RolesGuard";
import { FindManyOrdersNearByUseCase } from "@/domain/carrier/application/useCases/Carrying/FindManyOrdersNearByUseCase";
import { CurrentUser } from "@/infra/auth/CurrentUserDecorator";
import { TokenSchema } from "@/infra/auth/jwt.strategy";
import z from "zod";
import { ZodValidationPipe } from "../pipes/ZodValidationPipe";

const queryParamsSchema = z.object({
    latitude: z.coerce.number().refine((value) => {
        return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
        return Math.abs(value) <= 180;
    }),
});
const queryValidationPipe = new ZodValidationPipe(queryParamsSchema);
type QueryParamsSchema = z.infer<typeof queryParamsSchema>;



@Controller("/carrying/orders/nearby")
@Roles(Role.Carrying)
@UseGuards(JwtAuthGuard, RoleGuard)
export class FindManyNearByController {

    constructor(
        private findManyNearBy: FindManyOrdersNearByUseCase,
    ) {}
    
    @Get()
    @HttpCode(200)
    async handle(
        @CurrentUser() user: TokenSchema,
        @Query(queryValidationPipe) { latitude, longitude }: QueryParamsSchema
    ) {

        const result = await this.findManyNearBy.execute({
            carryingId: user.sub,
            latitude,
            longitude,
        });
        
        
        const orders = result.value?.orders
        
        return { orders: orders?.map(OrderPresenter.toHTTP) };
    }
}