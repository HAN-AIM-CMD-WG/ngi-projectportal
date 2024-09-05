package nl.han.ngi.projectportalbackend.core.services;

import nl.han.ngi.projectportalbackend.core.models.Person;
import nl.han.ngi.projectportalbackend.core.models.Project;
import nl.han.ngi.projectportalbackend.core.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> getAll() {
        return projectRepository.getAll();
    }

    public List<Project> getAllByUser(String email) {
        return projectRepository.getAllByUser(email);
    }

    public boolean existsByTitle(String title) {
        return projectRepository.existsByTitle(title);
    }

    public Project getProject(String uuid){
        return projectRepository.getProject(uuid);
    }

    public Project createProject(Project project, String creator) {
        return projectRepository.createProject(project, creator);
    }

    public Project updateProject(String uuid, Project project) {
        return projectRepository.update(uuid, project);
    }

    public void deleteProject(String uuid) {
        projectRepository.delete(uuid);
    }

    public void addParticipantToProject(String uuid, Person person, String function) {
        projectRepository.addParticipantToProject(uuid, person, function);
    }

//    public void removeParticipantFromProject(String title, String email) {
//        projectRepository.removeParticipantFromProject(title, email);
//    }
}
