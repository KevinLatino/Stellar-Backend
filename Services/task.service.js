import { Task } from '../Models/tasks.model.js';
import { Op } from 'sequelize';

class TaskServices {

    async findById(id) {
        const findId = await Task.findByPk(id);
        return findId;
    }

    async getTasksByPriority(id, priority) {
        const getTasks = await Task.findAll({
            where: {
                userId: id,
                completed: false,
                priority: priority
            }
        });
        return getTasks;
    }

    async getCompletedTask(id) {
        const getTasks = await Task.findAll({
            where: {
                userId: id,
                completed: true
            }
        });
        return getTasks;
    }

    async getUrgentTasks(id) {
        return this.getTasksByPriority(id, 'urgente');
    }

    async getWaitingTasks(id) {
        return this.getTasksByPriority(id, 'espera');
    }

    async getNormalTasks(id) {
        return this.getTasksByPriority(id, 'normal');
    }

    async createTask(taskData) {
        const newTask = await Task.create(taskData);
        return newTask;
    }

    async updateTask(id, updateBody) {
        const findId = await this.findById(id);
        const update = await findId.update(updateBody);
        return update;
    }

    async countCompletedUrgentTasks(userId) {
        const count = await Task.count({
            where: {
                userId: userId,
                completed: true,
                priority: 'urgente'
            }
        });
        return count;
    }

    async countCompletedNormalTasks(userId) {
        const count = await Task.count({
            where: {
                userId: userId,
                completed: true,
                priority: 'normal'
            }
        });
        return count;
    }

    async countCompletedWaitingTasks(userId) {
        const count = await Task.count({
            where: {
                userId: userId,
                completed: true,
                priority: 'espera'
            }
        })
        return count;
    }
    async getTodayTasks(userId) {
        const now = new Date();
        const todayStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0));
        const todayEnd = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59));
        const tasks = await Task.findAll({
            where: {
                userId: userId,
                dueDate: {
                    [Op.between]: [todayStart, todayEnd]
                }
            }
        });
        return tasks;
    }
}


export default TaskServices;
