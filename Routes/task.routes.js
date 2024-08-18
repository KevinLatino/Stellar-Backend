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
    }
);


router.get('/today/:userId',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const userId = req.params.userId;
            const tasks = await taskServices.getTodayTasks(userId);
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las tareas de hoy', error: error.message });
        }
    });

router.get('/week/:userId',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const userId = req.params.userId;
            const tasks = await taskServices.getTasksByCurrentWeek(userId);
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });


router.get('/overdue/:userId',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const userId = req.params.userId;
            const tasks = await taskServices.getOverdueTasks(userId);
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las tareas vencidas', error: error.message });
        }
    });

router.get('/total/overdue/:userId',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const userId = req.params.userId;
            const tasks = await taskServices.countOverdueTasks(userId);
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las tareas vencidas', error: error.message });
        }
    });


router.get('/pending/urgent/:userId',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const userId = req.params.userId;
            const count = await taskServices.countPendingUrgentTasks(userId);
            res.json(count);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

router.get('/pending/normal/:userId',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const userId = req.params.userId;
            const count = await taskServices.countPendingNormalTasks(userId);
            res.json(count);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

router.get('/pending/waiting/:userId',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const userId = req.params.userId;
            const count = await taskServices.countPendingWaitingTasks(userId);
            res.json(count);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

router.get('/pending/total/:userId',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const userId = req.params.userId;
            const count = await taskServices.totalPendingTasks(userId);
            res.json(count);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });


router.put('/update/:id',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const { id } = req.params;
            const bodyUpdated = req.body;
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

router.get('/completed/january/:userId', 
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
    try {
        const { userId } = req.params;
        const tasks = await taskServices.getCompletedTasksInJanuary(userId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/completed/february/:userId',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
    try {
        const { userId } = req.params;
        const tasks = await taskServices.getCompletedTasksInFebruary(userId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/completed/march/:userId',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
    try {
        const { userId } = req.params;
        const tasks = await taskServices.getCompletedTasksInMarch(userId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/completed/april/:userId', 
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
    try {
        const { userId } = req.params;
        const tasks = await taskServices.getCompletedTasksInApril(userId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/completed/may/:userId',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
    try {
        const { userId } = req.params;
        const tasks = await taskServices.getCompletedTasksInMay(userId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/completed/june/:userId', 
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
    try {
        const { userId } = req.params;
        const tasks = await taskServices.getCompletedTasksInJune(userId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/completed/july/:userId',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
    try {
        const { userId } = req.params;
        const tasks = await taskServices.getCompletedTasksInJuly(userId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/completed/august/:userId',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
    try {
        const { userId } = req.params;
        const tasks = await taskServices.getCompletedTasksInAugust(userId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/titles-dates/:userId',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const { userId } = req.params;
            const tasks = await taskServices.getTitleAndDate(userId);
            res.json(tasks)
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })

router.delete('/delete/:id',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const { id } = req.params;
            const deleteTask = await taskServices.deleteTask(id);
            res.json(deleteTask)
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })

export default router;
