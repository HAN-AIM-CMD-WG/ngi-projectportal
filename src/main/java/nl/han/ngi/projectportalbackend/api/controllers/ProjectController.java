package nl.han.ngi.projectportalbackend.api.controllers;

import jakarta.websocket.server.PathParam;
import nl.han.ngi.projectportalbackend.core.models.Project;
import nl.han.ngi.projectportalbackend.core.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping()
    public List<Project> getAll(){
        return projectService.getAll();
    }

    @GetMapping("/{title}")
    public Project getProject(@PathVariable String title){
        return projectService.getProject(title);
    }

    @PostMapping("/create/{creator}")
    public Project createProject(@PathVariable String creator, @RequestBody Project project){
        return projectService.createProject(project, creator);

    }

    @PutMapping("/{title}")
    public Project updateProject(@PathVariable String title, @RequestBody Project project){
        return projectService.updateProject(title, project);
    }

    @DeleteMapping("/{title}")
    public ResponseEntity<Integer> deleteProject(@PathVariable String title){
        projectService.deleteProject(title);
        return ResponseEntity.ok().build();
    }
}
