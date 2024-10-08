import SessionRoutes from './session.routes.js'
import UserRoutes from './user.routes.js';
import TaskRoutes from './task.routes.js'
import MedalRoutes from './medal.routes.js'
import UserMedalRoutes from './user-medal.routes.js'


const initRoutes = (app) => {
    app.use('/users', UserRoutes)
    app.use('/sessions', SessionRoutes);
    app.use('/tasks', TaskRoutes)
    app.use('/medals', MedalRoutes)
    app.use('/user-medal', UserMedalRoutes);
}

export default initRoutes