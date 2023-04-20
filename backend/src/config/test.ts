import ConfigInterface from './ConfigInterface';

const config: ConfigInterface = {
  env: 'test',
  database: {
    type: 'postgres' as const,
    cache: false,
    url: process.env.POSTGRESQL_URL_TEST,
    username: process.env.POSTGRESQL_USERNAME_TEST,
    schema: process.env.POSTGRESQL_SCHEMA_TEST,
    dropSchema: true,
    entities: ['src/entities/*.ts'],
    logger: 'advanced-console' as const,
    synchronize: true,
  },
  graphQLPath: '/graphql',
  resolvers: [`${__dirname}/../resolvers/**/*Resolver.ts`],
};

export default config;
