import SessionRoutes from './session.routes.js'
import UserRoutes from './user.routes.js';
import TaskRoutes from './task.routes.js'


const initRoutes = (app) => {
    app.use('/users', UserRoutes)
    app.use('/sessions', SessionRoutes);
    app.use('/tasks', TaskRoutes)
}

export default initRoutes