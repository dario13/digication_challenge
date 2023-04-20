import ConfigInterface from './ConfigInterface';

const config: ConfigInterface = {
  env: 'development',
  database: {
    type: 'postgres' as const,
    cache: false,
    url: process.env.POSTGRESQL_URL_DEV,
    username: process.env.POSTGRESQL_USERNAME_DEV,
    schema: process.env.POSTGRESQL_SCHEMA_DEV,
    dropSchema: true,
    entities: ['src/entities/*.ts'],
    logger: 'advanced-console' as const,
    synchronize: true,
  },
  graphQLPath: '/graphql',
  resolvers: [`${__dirname}/../resolvers/**/*Resolver.ts`],
};

export default config;
