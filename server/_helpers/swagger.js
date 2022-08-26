import express from 'express';
const DocsRouter = express.Router();
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
const swaggerDocument = YAML.load('./swagger.yaml');

DocsRouter.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default DocsRouter;
