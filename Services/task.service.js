import { Task } from '../Models/tasks.model.js'

class TaskServices {
    
    async getNotCompletedTasks(id) {
        const getTasks = await Task.findAll({ 
            where: { 
                userId: id,
                completed: false
            }
        });
        return getTasks;
    }

    async createTask(taskData) {
        const newTask = await Task.create(taskData);
        return newTask;
    }
}

export default TaskServices;
