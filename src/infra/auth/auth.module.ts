import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { EnvService } from "../env/env.service";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [ 
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            global: true,
            useFactory(env: EnvService) {
                const privateKey = env.get('JWT_PRIVATE_KEY');
                const publicKey = env.get('JWT_PUBLIC_KEY');        
                return {
                    signOptions: { algorithm: 'RS256'},
                    privateKey: Buffer.from(privateKey, 'base64'),
                    publicKey: Buffer.from(publicKey, 'base64')
                }
            }
        })
    ]
})
export class AuthModule {}