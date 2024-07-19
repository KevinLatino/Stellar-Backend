import { Router } from 'express';
import TaskServices from '../Services/task.service.js';
import passport from 'passport';

const router = Router();
const taskServices = new TaskServices();

router.get('/urgent/:id',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const tasks = await taskServices.getUrgentTasks(req.params.id);
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

router.get('/waiting/:id',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const tasks = await taskServices.getWaitingTasks(req.params.id);
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

router.get('/normal/:id',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const tasks = await taskServices.getNormalTasks(req.params.id);
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

router.get('/completed/:id',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const { id } = req.params;
            const tasks = await taskServices.getCompletedTask(id);
            res.json(tasks)
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

router.get('/completed/urgent/:id',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const { id } = req.params;
            const count = await taskServices.countCompletedUrgentTasks(id);
            res.json(count);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

router.get('/completed/normal/:id',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const { id } = req.params;
            const count = await taskServices.countCompletedNormalTasks(id);
            res.json(count);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

router.get('/completed/waiting/:id',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const { id } = req.params;
            const count = await taskServices.countCompletedWaitingTasks(id);
            res.json(count);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

router.post('/create',
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
        try {
            const taskData = req.body;
            const newTask = await taskServices.createTask(taskData);
            res.json(newTask);
        } catch (error) {
            next(error);
        }
    });

router.put('/update/:id',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const { id } = req.params;
            const bodyUpdated = req.body;

            // Verifica que el ID y bodyUpdated estén presentes
            if (!id) {
                return res.status(400).json({ error: "ID is required" });
            }
            if (!bodyUpdated || typeof bodyUpdated !== 'object') {
                return res.status(400).json({ error: "Update data is required" });
            }

            const updatedTask = await taskServices.updateTask(id, bodyUpdated);
            if (!updatedTask) {
                return res.status(404).json({ error: "Task not found" });
            }

            return res.json(updatedTask);
        } catch (error) {
            console.error("Error updating task:", error.message);
            res.status(500).json({ error: error.message });
        }
    });

export default router;
