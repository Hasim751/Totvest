import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"

 const config : PostgresConnectionOptions = {
  name: "default",
  type: "postgres",
  host: "localhost",
  port: 5432,
  // schema: 'tenant_1',
  username: "postgres",
  password: "123456",
  database: "totvest",
  entities: [__dirname + '/app/**/entity/*.entity{.ts,.js}'],
  // namingStrategy:  new SnakeNamingStrategy(),
  // We are using migrations, synchronize should be set to false.
  synchronize: false,

  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  // migrationsRun: true,
  // logging: true,
  // allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev
  migrations: [__dirname + '/migrations/app/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations/app',
    entitiesDir: 'src/entities/app',
  }
}

export = config