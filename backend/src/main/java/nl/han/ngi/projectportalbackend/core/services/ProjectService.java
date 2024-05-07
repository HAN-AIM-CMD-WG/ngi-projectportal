package nl.han.ngi.projectportalbackend.core.services;

import nl.han.ngi.projectportalbackend.core.models.Person;
import nl.han.ngi.projectportalbackend.core.models.Project;
import nl.han.ngi.projectportalbackend.core.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public List<Project> getAllByUser(String uuid) {
        return projectRepository.getAllByUser(uuid);
    }

    public boolean existsByTitle(String title) {
        return projectRepository.existsByTitle(title);
    }

    public Project getProject(String title){
        return projectRepository.getProject(title);
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
