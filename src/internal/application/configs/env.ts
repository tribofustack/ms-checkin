export const env = {
  isTest: process.env.NODE_ENV === "test",
  port: Number(process.env.PORT) ?? 3001,

  dbHost: String(process.env.DB_HOST),
  dbPort: Number(process.env.DB_PORT),
  dbName: String(process.env.DB_NAME),
  dbUser: String(process.env.DB_USERNAME),
  dbPassword: String(process.env.DB_PASSWORD),
  dbDialect: String(process.env.DB_DIALECT),

  amqpHost: String(process.env.AMQP_HOST),
  amqpPass: String(process.env.AMQP_PASSWORD),
  amqpPort: Number(process.env.AMQP_PORT),
  amqpUserName: String(process.env.AMQP_USERNAME),
};
