// src/main/java/nl/han/ngi/projectportalbackend/api/controllers/ProjectDetailController.java
package nl.han.ngi.projectportalbackend.api.controllers;

import nl.han.ngi.projectportalbackend.core.models.Project;
import nl.han.ngi.projectportalbackend.core.services.ProjectDetailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/projectDetail")
public class ProjectDetailController {

    private final ProjectDetailService projectDetailService;

    public ProjectDetailController(ProjectDetailService projectDetailService) {
        this.projectDetailService = projectDetailService;
    }

    // Endpoint to fetch project details by UUID
    @GetMapping("/{uuid}")
    public ResponseEntity<Project> getProjectDetail(@PathVariable String uuid) {
        try {
            Project project = projectDetailService.getProjectDetail(uuid);
            return new ResponseEntity<>(project, HttpStatus.OK);
        } catch (Exception exc) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint to update project details
    @PutMapping("/{uuid}")
    public ResponseEntity<Project> updateProjectDetail(@PathVariable String uuid, @RequestBody Project project) {
        try {
            Project updatedProject = projectDetailService.updateProjectDetail(uuid, project);
            return new ResponseEntity<>(updatedProject, HttpStatus.OK);
        } catch (Exception exc) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // Endpoint to upload an image for the project
    @PostMapping("/{uuid}/uploadImage")
    public ResponseEntity<String> uploadProjectImage(@PathVariable String uuid, @RequestParam("image") MultipartFile imageFile) {
        try {
            projectDetailService.saveProjectImage(uuid, imageFile);
            return new ResponseEntity<>("Image uploaded successfully", HttpStatus.OK);
        } catch (Exception exc) {
            return new ResponseEntity<>(exc.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Additional project detail-specific endpoints can be added here
}
