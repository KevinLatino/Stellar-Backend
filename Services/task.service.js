import { Task } from '../Models/tasks.model.js'


class TaskServices {
    
    async getAllTasks(id) {
        const getTasks = await Task.findAll({ where: { userId: id }});
        return getTasks;
    }

    async createTask(taskData) {
        const newTask = await Task.create(taskData);
        return newTask;
    }
}

export default TaskServices;