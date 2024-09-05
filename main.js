import express from 'express'
import cors from 'cors';
import initRoutes from './Routes/initialize.routes.js';
import initModels from './Models/init.model.js';
import initAssociations from './Models/associations.js';
import initStrategies from './Auth/init.strategies.js';
import db from './Config/connection.js'

//functionalities of express
const app = express();

//cors
app.use(cors());

//the backend can receive json files
app.use(express.json());


const initDataBase = async () => {
    try {
        //Authenticate db
        await db.authenticate();
        console.log('Could not connect to the DB.');

        //initialize strategies
        initStrategies();
        
        //initialize models of sequelizie that are created
        initModels();

        //initialize associations between the models
        initAssociations();

        //sync models of sequelize that are created
        await db.sync({ alter: true });
        console.log('running.');
    } catch (error) {
        console.error('not running', error);
    }
}

const port = 3000;

initRoutes(app);
initDataBase();

app.listen(port, () => console.log(`connected on port ${port}`));


