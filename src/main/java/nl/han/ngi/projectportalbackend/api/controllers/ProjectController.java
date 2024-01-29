package nl.han.ngi.projectportalbackend.api.controllers;

import nl.han.ngi.projectportalbackend.core.models.Project;
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

    @GetMapping()
    public ResponseEntity getAll(){
        try {
            return new ResponseEntity(projectService.getAll(), HttpStatus.OK);
        } catch(Exception exc){
            return new ResponseEntity(exc.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //GET BASED ON User
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

    @DeleteMapping("/{title}")
    public ResponseEntity deleteProject(@PathVariable String title){
        try{
            projectService.deleteProject(title);
            return new ResponseEntity("Project with title: " + title + " has been successfully deleted", HttpStatus.OK);
        } catch(Exception exc){
            return new ResponseEntity(exc.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
