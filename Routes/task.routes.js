import { Router } from 'express';
import TaskServices from '../Services/task.service.js';
import passport from 'passport';

const router = Router();
const taskServices = new TaskServices();

router.get('/urgent/:id', async (req, res) => {
    try {
        const tasks = await taskServices.getUrgentTasks(req.params.id);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/waiting/:id', async (req, res) => {
    try {
        const tasks = await taskServices.getWaitingTasks(req.params.id);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/normal/:id', async (req, res) => {
    try {
        const tasks = await taskServices.getNormalTasks(req.params.id);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/completed/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const tasks = await taskServices.getCompletedTask(id);
        res.json(tasks)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.post('/create',
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const taskData = req.body;
            const newTask = await taskServices.createTask(taskData)
            res.json(newTask)
        } catch (error) {
            next(error);
        }
    });

router.put('/update/:id',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const { id } = req.params;
            const bodyupDated = req.body;
            const updateTask = await taskServices.upDateTask(id, bodyupDated);
            return updateTask;
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })

export default router;
