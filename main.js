import express from 'express'
import cors from 'cors'
import initModels from './Models/init.model.js';
import initAssociations from './Models/associations.js';
import db from './Config/connection.js'

const app = express();

app.use(cors);


const initDataBase = async () => {
    try {
        await db.authenticate();
        console.log('Could not connect to the DB.');

        //initialize models of sequelizie that are created
        initModels();

        initAssociations();

        //sync models of sequelize that are created
        await db.sync({ alter: true });
        console.log('running.');
    } catch (error) {
        console.error('not running', error);
    }
}

const port = 3000;

app.listen(port, () => console.log(`connected on port ${port}`));


initDataBase();

