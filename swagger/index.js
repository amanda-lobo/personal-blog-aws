const swaggerJsdoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Personal Blog API - AWS re/Start',
    version: '1.0.0',
    description: 'API for a personal blog',
  },
  servers: [
    {
      url: 'https://localhost:3000/',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['swagger/*yaml'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
