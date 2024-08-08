import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Speech Command API',
      version: '1.0.0',
      description: 'API documentation for speech command application',
    },
    servers: [
      {
        url: 'http://localhost:8000', // Change to your server's URL
      },
    ],
  },
  apis: ['./controllers/*.js'], // Path to your API routes
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};