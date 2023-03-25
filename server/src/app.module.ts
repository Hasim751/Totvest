import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import  * as config from './ormconfig';
import { AuthModule } from './app/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './app/auth/common/guards';
import { ConfigModule } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { UserModule } from './app/user/user.module';
import { StartupModule } from './app/startup/startup.module';

@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      async useFactory() {
        return {
          ...config as PostgresConnectionOptions,
          autoLoadEntities: true,
        };
      },
    }),
    UserModule,
    AuthModule,
    StartupModule
  ],
  providers: [{
    provide: APP_GUARD,
    useClass: AtGuard,
  }],

})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes("*");
  }
}


