import { BadRequestException, Controller, Get, HttpCode, NotFoundException, Param, UseGuards } from "@nestjs/common";
import { ResourseNotFound } from "@/core/errors/errors/ResourseNotFound";
import { GetOrderByIdUseCase } from "@/domain/carrier/application/useCases/Order/GetOrderByIdUseCase";
import { OrderPresenter } from "../presenter/OrderPresenter";
import { Roles } from "@/infra/auth/RolesDecorator";
import { Role } from '@/infra/auth/RolesDecorator';
import { JwtAuthGuard } from "@/infra/auth/JwtAuth.guard";
import { RoleGuard } from "@/infra/auth/RolesGuard";
import { FetchCarryingOrdersUseCase } from "@/domain/carrier/application/useCases/Carrying/FetchCarryingOrdersUseCase";
import { CurrentUser } from "@/infra/auth/CurrentUserDecorator";
import { TokenSchema } from "@/infra/auth/jwt.strategy";


@Controller("/carrying/orders/:page")
@Roles(Role.Carrying)
@UseGuards(JwtAuthGuard, RoleGuard)
export class FetchCarryingOrdersController {

    constructor(
        private fetchOrders: FetchCarryingOrdersUseCase,
    ) {}
    
    @Get()
    @HttpCode(200)
    async handle(
        @CurrentUser() user: TokenSchema,
        @Param('page') page: number
    ) {
        const result = await this.fetchOrders.execute({
            carryingId: user.sub,
            page
        });
        
        const orders = result.value?.orders

        return { orders: orders?.map(OrderPresenter.toHTTP) };
    }
}