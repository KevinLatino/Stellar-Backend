import { Router } from 'express';
import TaskServices from '../Services/task.service.js';
import passport from 'passport';

const router = Router();
const taskServices = new TaskServices();

// Ruta para crear una nueva tarea
router.post('/create',
    passport.authenticate("jwt", {session: false}),
    async (req, res, next) => {
    try {
        const taskData = req.body;
        const newTask = await taskServices.createTask(taskData)
        res.json(newTask)
    } catch (error) {
        next(error);
    }
});

export default router;
