package nl.han.ngi.projectportalbackend.api.controllers;

import nl.han.ngi.projectportalbackend.core.models.Task;
import nl.han.ngi.projectportalbackend.core.services.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/task")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping // Change to POST
    public ResponseEntity<List<Task>> getAll(@RequestBody List<String> projectUuids) {
        try {
            System.out.println(projectUuids);
            List<Task> tasks = taskService.getAllByProjectUuids(projectUuids);
            System.out.println(tasks);
            return new ResponseEntity<>(tasks, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/{creator}")
    public ResponseEntity createTask(
            @PathVariable String creator,
            @RequestParam String projectUuid,
            @RequestBody Task task
    ) {
        return new ResponseEntity(taskService.createTask(projectUuid, creator, task), HttpStatus.OK);
    }

    @GetMapping("/{person}/availableTasks")
    public ResponseEntity getAvailableTasksOfPerson(@PathVariable String person){
        return new ResponseEntity(taskService.getAvailableTasksOfPerson(person), HttpStatus.OK);
    }
}
