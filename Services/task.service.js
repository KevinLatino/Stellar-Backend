import { Task } from '../Models/tasks.model.js';
import { Op } from 'sequelize';

const getMonthStartEnd = (year, month) => {
    const startDate = new Date(Date.UTC(year, month, 1, 0, 0, 0));
    const endDate = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59));
    return { startDate, endDate };
};

class TaskServices {
    async findById(id) {
        return await Task.findByPk(id);
    }

    async getTasksByPriority(userId, priority, completed = false) {
        return await Task.findAll({
            where: {
                userId,
                completed,
                priority
            }
        });
    }

    async getCompletedTasks(userId) {
        return await Task.findAll({
            where: {
                userId,
                completed: true
            }
        });
    }

    async getUrgentTasks(userId) {
        return this.getTasksByPriority(userId, 'Alta');
    }

    async getWaitingTasks(userId) {
        return this.getTasksByPriority(userId, 'Baja');
    }

    async getNormalTasks(userId) {
        return this.getTasksByPriority(userId, 'Moderada');
    }

    async getTodayTasks(userId) {
        const now = new Date();
        const todayStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0));
        const todayEnd = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59));
        return await Task.findAll({
            where: {
                userId,
                completed: false,
                dueDate: {
                    [Op.between]: [todayStart, todayEnd]
                }
            }
        });
    }

    async getTasksByCurrentWeek(userId) {
        const now = new Date();
        const dayOfWeek = now.getDay();
        const differenceToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
        const firstDayOfWeek = new Date(now.setDate(now.getDate() + differenceToMonday));
        firstDayOfWeek.setHours(0, 0, 0, 0);

        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
        lastDayOfWeek.setHours(23, 59, 59, 999);

        return await Task.findAll({
            where: {
                userId,
                completed: false,
                dueDate: {
                    [Op.between]: [firstDayOfWeek, lastDayOfWeek]
                }
            }
        });
    }

    async createTask(taskData) {
        return await Task.create(taskData);
    }

    async updateTask(id, updateBody) {
        const task = await this.findById(id);
        if (!task) throw new Error('Task not found');
        return await task.update(updateBody);
    }

    async countTasksByPriority(userId, priority, completed = false) {
        return await Task.count({
            where: {
                userId,
                completed,
                priority
            }
        });
    }

    async countPendingUrgentTasks(userId) {
        return this.countTasksByPriority(userId, 'Alta', false);
    }

    async countPendingNormalTasks(userId) {
        return this.countTasksByPriority(userId, 'Moderada', false);
    }

    async countPendingWaitingTasks(userId) {
        return this.countTasksByPriority(userId, 'Baja', false);
    }

    async countCompletedUrgentTasks(userId) {
        return this.countTasksByPriority(userId, 'Alta', true);
    }

    async countCompletedNormalTasks(userId) {
        return this.countTasksByPriority(userId, 'Moderada', true);
    }

    async countCompletedWaitingTasks(userId) {
        return this.countTasksByPriority(userId, 'Baja', true);
    }

    async totalPendingTasks(userId) {
        return await Task.count({
            where: {
                userId,
                completed: false
            }
        });
    }

    async getOverdueTasks(userId) {
        const now = new Date();
        return await Task.findAll({
            where: {
                userId,
                completed: false,
                dueDate: {
                    [Op.lt]: now
                }
            }
        });
    }

    async countOverdueTasks(userId) {
        const now = new Date();
        return await Task.count({
            where: {
                userId,
                completed: false,
                dueDate: {
                    [Op.lt]: now
                }
            }
        });
    }

    async countCompletedTasksInMonth(userId, month) {
        const year = new Date().getFullYear();
        const { startDate, endDate } = getMonthStartEnd(year, month);

        return await Task.count({
            where: {
                userId,
                completed: true,
                dueDate: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });
    }

    async getTitleAndDate(userId) {
        const findTasks = await Task.findAll({
            attributes: ['title', 'dueDate', 'priority'],
            where: {
                userId,
                completed: false
            }
        });
        return findTasks
    }

    async getCompletedTasksInJanuary(userId) {
        return this.countCompletedTasksInMonth(userId, 0);
    }

    async getCompletedTasksInFebruary(userId) {
        return this.countCompletedTasksInMonth(userId, 1);
    }

    async getCompletedTasksInMarch(userId) {
        return this.countCompletedTasksInMonth(userId, 2);
    }

    async getCompletedTasksInApril(userId) {
        return this.countCompletedTasksInMonth(userId, 3);
    }

    async getCompletedTasksInMay(userId) {
        return this.countCompletedTasksInMonth(userId, 4);
    }

    async getCompletedTasksInJune(userId) {
        return this.countCompletedTasksInMonth(userId, 5);
    }

    async getCompletedTasksInJuly(userId) {
        return this.countCompletedTasksInMonth(userId, 6);
    }

    async getCompletedTasksInAugust(userId) {
        return this.countCompletedTasksInMonth(userId, 7);
    }

    async deleteTask(id) {
        const deleted = await Task.destroy({
            where: {
                id: id
            }
        })
        if (deleted) {
            return `Task with id ${id} was deleted.`;
        } else {
            return `Task with id ${id} not found.`;
        }
    }
}

export default TaskServices;
