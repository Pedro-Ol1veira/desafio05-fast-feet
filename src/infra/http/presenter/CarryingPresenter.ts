import { Carrying } from "@/domain/carrier/enterprise/entities/Carrying";


export class CarryingPresenter {
    static toHTTP(carrying: Carrying) {
        return {
            id: carrying.id.toString(),
            name: carrying.name,
            email: carrying.email,
            cpf: carrying.cpf
        }
    }
}