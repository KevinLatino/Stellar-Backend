import UserRoutes from './user.routes.js';

const initRoutes = (app) => {
    app.use('/users', UserRoutes)
}

export default initRoutes