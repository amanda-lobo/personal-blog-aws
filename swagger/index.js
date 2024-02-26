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
      url: 'https://personal-blog-aws.onrender.com/',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['swagger/*yaml'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
