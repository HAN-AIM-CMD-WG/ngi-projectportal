package nl.han.ngi.projectportalbackend.core.services;

import nl.han.ngi.projectportalbackend.core.models.Project;
import nl.han.ngi.projectportalbackend.core.models.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    public Project getProject(int id){
        return projectRepository.getProject(id);
    }
}
