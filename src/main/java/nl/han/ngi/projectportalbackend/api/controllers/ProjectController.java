package nl.han.ngi.projectportalbackend.api.controllers;

import nl.han.ngi.projectportalbackend.core.exceptions.PersonIsAGuestException;
import nl.han.ngi.projectportalbackend.core.models.Person;
import nl.han.ngi.projectportalbackend.core.models.Project;
import nl.han.ngi.projectportalbackend.core.services.PersonService;
import nl.han.ngi.projectportalbackend.core.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private PersonService personService;

    @GetMapping()
    public ResponseEntity getAll(){
        return new ResponseEntity(projectService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{email}")
    public ResponseEntity getAllByUser(@PathVariable String email){
        try {
            return new ResponseEntity(projectService.getAllByUser(email), HttpStatus.OK);
        } catch(Exception exc){
            return new ResponseEntity(exc.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/create/{creator}")
    public ResponseEntity createProject(@PathVariable String creator, @RequestBody Project project){
        try {
            return new ResponseEntity(projectService.createProject(project, creator), HttpStatus.OK);
        } catch(Exception exc) {
            return new ResponseEntity(exc.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{title}")
    public ResponseEntity updateProject(@PathVariable String title, @RequestBody Project project){
        try{
            return new ResponseEntity(projectService.updateProject(title, project), HttpStatus.OK);
        } catch(Exception exc){
            return new ResponseEntity(exc.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/exists/{title}")
    public ResponseEntity<Boolean> existsByTitle(@PathVariable String title) {
        boolean exists = projectService.existsByTitle(title);
        return new ResponseEntity<>(exists, HttpStatus.OK);
    }

    @DeleteMapping("/{title}")
    public ResponseEntity deleteProject(@PathVariable String title){
        try{
            projectService.deleteProject(title);
            return new ResponseEntity("Project with title: " + title + " has been successfully deleted", HttpStatus.OK);
        } catch(Exception exc){
            return new ResponseEntity(exc.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{title}/{email}")
    public ResponseEntity addParticipantToProject(@PathVariable String title, @PathVariable String email, @RequestBody String function){
        try{
            Person person = personService.getPerson(email);
            if(person.getStatus().contains("GAST")){
                throw new PersonIsAGuestException(email);
            }
            projectService.addParticipantToProject(title, person, function);
            return new ResponseEntity("Person with email: " + email + " has been successfully added to project with title: " + title, HttpStatus.OK);
        } catch(Exception exc){
            return new ResponseEntity(exc.getMessage(), HttpStatus.BAD_REQUEST);
        }
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
