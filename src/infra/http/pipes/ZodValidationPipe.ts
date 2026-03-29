import { BadRequestException, PipeTransform } from "@nestjs/common";
import { ZodError, ZodObject, z } from "zod";

export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodObject) {}

    transform(value: unknown) {
        try {
            const paresedValue = this.schema.parse(value);
            return paresedValue;
        } catch (error) {
            if(error instanceof ZodError) {
                throw new BadRequestException({
                    message: 'validation failed',
                    status: 400,
                    errors: z.flattenError(error)
                });
            }

            throw new BadRequestException('validation failed');
        }
    }

}