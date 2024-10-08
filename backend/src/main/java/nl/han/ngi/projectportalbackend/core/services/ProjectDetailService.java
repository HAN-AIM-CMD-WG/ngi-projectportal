// src/main/java/nl/han/ngi/projectportalbackend/core/services/ProjectDetailService.java
package nl.han.ngi.projectportalbackend.core.services;

import nl.han.ngi.projectportalbackend.core.models.Project;
import nl.han.ngi.projectportalbackend.core.repositories.ProjectDetailRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ProjectDetailService {

    private final ProjectDetailRepository projectDetailRepository;

    public ProjectDetailService(ProjectDetailRepository projectDetailRepository) {
        this.projectDetailRepository = projectDetailRepository;
    }

    public Project getProjectDetail(String uuid) {
        return projectDetailRepository.getProjectDetail(uuid);
    }

    public Project updateProjectDetail(String uuid, Project project) {
        return projectDetailRepository.updateProjectDetail(uuid, project);
    }

    public void saveProjectImage(String uuid, MultipartFile imageFile) throws Exception {
        projectDetailRepository.saveProjectImage(uuid, imageFile);
    }
}
