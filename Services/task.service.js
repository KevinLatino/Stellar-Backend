import { Task } from '../Models/tasks.model.js'

class TaskServices {

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

    async findById(id) {
        const findId = await Store.findByPk(id);
        return findId;
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

    async upDateTask(id, upDateBody) {
        const findId = await this.findById(id);
        const update = await Task.update(findId, upDateBody);
        return update
    }
}

export default TaskServices;
