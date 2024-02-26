require('dotenv').config();

const express = require('express');
const sequelize = require('./config/config');
const userController = require('./src/controller/userController');
const postsController = require('./src/controller/postsController');
const themeController = require('./src/controller/themeController');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/index');

app.use(cors(corsOptions));
app.use(express.json());

app.use(userController);
app.use(postsController);
app.use(themeController);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection successfully established!');

    sequelize.sync().then(() => {
      console.log('Models successfully synchronized!');
    }).catch((error) => {
      console.error('Error synchronizing templates:', error);
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });
