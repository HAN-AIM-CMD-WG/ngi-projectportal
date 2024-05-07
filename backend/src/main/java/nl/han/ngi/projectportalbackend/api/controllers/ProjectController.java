package nl.han.ngi.projectportalbackend.api.controllers;

import nl.han.ngi.projectportalbackend.core.exceptions.PersonIsAGuestException;
import nl.han.ngi.projectportalbackend.core.models.Person;
import nl.han.ngi.projectportalbackend.core.models.Project;
import nl.han.ngi.projectportalbackend.core.models.Task;
import nl.han.ngi.projectportalbackend.core.services.PersonService;
import nl.han.ngi.projectportalbackend.core.services.ProjectService;
import nl.han.ngi.projectportalbackend.core.services.TaskService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/project")
public class ProjectController {

    private final ProjectService projectService;

    private final PersonService personService;

    private final TaskService taskService;

    public ProjectController(ProjectService projectService, PersonService personService, TaskService taskService) {
        this.projectService = projectService;
        this.personService = personService;
        this.taskService = taskService;
    }

    @GetMapping()
    public ResponseEntity getAll(){
        return new ResponseEntity(projectService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{uuid}")
    public ResponseEntity getAllByUser(@PathVariable String uuid){
        return new ResponseEntity(projectService.getAllByUser(uuid), HttpStatus.OK);
    }

    @PostMapping("/create/{creator}")
    public ResponseEntity createProject(@PathVariable String creator, @RequestBody Project project){
        try {
            return new ResponseEntity(projectService.createProject(project, creator), HttpStatus.OK);
        } catch(Exception exc) {
            return new ResponseEntity(exc.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{uuid}")
    public ResponseEntity updateProject(@PathVariable String uuid, @RequestBody Project project){
        try{
            return new ResponseEntity(projectService.updateProject(uuid, project), HttpStatus.OK);
        } catch(Exception exc){
            return new ResponseEntity(exc.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/exists/{title}")
    public ResponseEntity<Boolean> existsByTitle(@PathVariable String title) {
        boolean exists = projectService.existsByTitle(title);
        return new ResponseEntity<>(exists, HttpStatus.OK);
    }

    @DeleteMapping("/{uuid}")
    public ResponseEntity deleteProject(@PathVariable String uuid){
        try{
            projectService.deleteProject(uuid);
            return new ResponseEntity("Project with uuid: " + uuid + " has been successfully deleted", HttpStatus.OK);
        } catch(Exception exc){
            return new ResponseEntity(exc.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{uuid}/{email}")
    public ResponseEntity addParticipantToProject(@PathVariable String uuid, @PathVariable String email, @RequestBody String function){
        try{
            Person person = personService.getPerson(email);
            if(person.getStatus().isEmpty()){
                throw new PersonIsAGuestException(email);
            }
            projectService.addParticipantToProject(uuid, person, function);
            return new ResponseEntity("Person with email: " + email + " has been successfully added to project with uuid: " + uuid, HttpStatus.OK);
        } catch(Exception exc){
            return new ResponseEntity(exc.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{uuid}/tasks")
    public ResponseEntity getTasksOfProject(@PathVariable String uuid){
        return new ResponseEntity(taskService.getTasksOfProject(uuid), HttpStatus.OK);
    }

    @GetMapping("/{title}/tasks")
    public ResponseEntity getTasksOfProjectWithTitle(@PathVariable String title){
        return new ResponseEntity(taskService.getTasksOfProjectWithTitle(title), HttpStatus.OK);
    }

    @PostMapping("/{uuid}/tasks/add/{creator}")
    public ResponseEntity createTaskToProject(@PathVariable String uuid, @PathVariable String creator, @RequestBody Task task){
        return new ResponseEntity(taskService.createTaskToProject(uuid, creator, task), HttpStatus.CREATED);
    }

//    @DeleteMapping("/{title}/{email}")
//    public ResponseEntity removeParticipantFromProject(@PathVariable String title, @PathVariable String email){
//        try{
//            projectService.removeParticipantFromProject(title, email);
//            return new ResponseEntity("", HttpStatus.OK);
//        } catch(Exception exc){
//            return new ResponseEntity(exc.getMessage(), HttpStatus.BAD_REQUEST);
//        }
//    }
}
