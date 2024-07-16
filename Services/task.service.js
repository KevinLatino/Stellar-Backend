import { Task } from '../Models/tasks.model.js'


class TaskServices {
    
    async getAllTasks() {
        const getTasks = await Task.findAll();
        return getTasks;
    }

    async createTask(taskData) {
        const newTask = await Task.create(taskData);
        return newTask;
    }
}

export default TaskServices;