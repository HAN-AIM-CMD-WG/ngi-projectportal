package nl.han.ngi.projectportalbackend.core.services;

import nl.han.ngi.projectportalbackend.core.models.Task;
import nl.han.ngi.projectportalbackend.core.repositories.TaskRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
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
    public List<Task> getTasksOfProjectWithTitle(String title) {
        return taskRepository.getTasksOfProjectWithTitle(title);
    }
    public List<Task> getTasksOfProject(String uuid) {
        return taskRepository.getTasksOfProject(uuid);
    }

    public Task createTaskToProject(String uuid, String creator, Task task) {
        return taskRepository.createTaskForProject(uuid, creator, task);
    }



    public List<Task> getAvailableTasksOfPerson(String person) {
        return taskRepository.getAvailableTasksOfPerson(person);
    }


}
