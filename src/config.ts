// import { registerAs } from '@nestjs/config';
// import { config as dotenvConfig } from 'dotenv';
// import { DataSource, DataSourceOptions } from 'typeorm';

// dotenvConfig({ path: '.env' });

// const config = {
//   type: 'postgres',
//   host: `${process.env.DATABASE_HOST}`,
//   port: `${process.env.DATABASE_PORT}`,
//   username: `${process.env.DATABASE_USERNAME}`,
//   password: `${process.env.DATABASE_PASSWORD}`,
//   database: `${process.env.DATABASE_NAME}`,
//   entities: ['src/db/entities/*.entity{.ts,.js}'],
//   migrations: ['src/db/migrations/*{.ts,.js}'],
//   autoLoadEntities: false,
//   synchronize: false,
// };

// export default registerAs('typeorm', () => config);
// export const connectionSource = new DataSource(config as DataSourceOptions);

import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['dist/db/entities/*.entity.{js,ts}'],
  migrations: ['dist/db/migrations/*.{js,ts}'],
  synchronize: false,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config);
