package nl.han.ngi.projectportalbackend.core.services;

import nl.han.ngi.projectportalbackend.core.models.Task;
import nl.han.ngi.projectportalbackend.core.repositories.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAll() {
        return taskRepository.getAll();
    }

    public Task createTask(String creator, Task task) {
        return taskRepository.createTask(creator, task);
    }
}
