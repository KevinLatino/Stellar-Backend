import SessionRoutes from './session.routes.js'
import UserRoutes from './user.routes.js';


const initRoutes = (app) => {
    app.use('/users', UserRoutes)
    app.use('/sessions', SessionRoutes)
}

export default initRoutes