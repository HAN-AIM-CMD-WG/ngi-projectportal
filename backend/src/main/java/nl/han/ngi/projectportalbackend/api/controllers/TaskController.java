package nl.han.ngi.projectportalbackend.api.controllers;

import nl.han.ngi.projectportalbackend.core.models.Task;
import nl.han.ngi.projectportalbackend.core.services.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/task")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping()
    public ResponseEntity getAll(){
            return new ResponseEntity(taskService.getAll(), HttpStatus.OK);
    }

    @PostMapping("/{creator}")
    public ResponseEntity createTask(@PathVariable String creator, @RequestBody Task task){
        return new ResponseEntity(taskService.createTask(creator, task), HttpStatus.OK);
    }
}
