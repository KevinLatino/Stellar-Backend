import express from 'express'
import cors from 'cors'
import initModels from './Models/init.model.js';
import initAssociations from './Models/associations.js';
import db from './Config/connection.js'

const app = express();

app.use(cors);


const initDataBase = async () => {
    try {
        // Autenticar la conexión a la base de datos
        await db.authenticate();
        console.log('Conexión a la base de datos establecida correctamente.');

        // Inicializar los modelos de Sequelize
        initModels();

        initAssociations();

        // Sincronizar los modelos con la base de datos
        await db.sync({ alter: true });
        console.log('Modelos sincronizados correctamente con la base de datos.');
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
    }
}

const port = 3000;

app.listen(port, () => console.log(`connected on port ${port}`));

initDataBase();

