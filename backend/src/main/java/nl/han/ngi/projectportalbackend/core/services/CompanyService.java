package nl.han.ngi.projectportalbackend.core.services;

import nl.han.ngi.projectportalbackend.core.models.Company;
import nl.han.ngi.projectportalbackend.core.models.Person;
import nl.han.ngi.projectportalbackend.core.models.Project;
import nl.han.ngi.projectportalbackend.core.repositories.CompanyRepository;
import nl.han.ngi.projectportalbackend.core.repositories.PersonRepository;
import nl.han.ngi.projectportalbackend.core.repositories.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {

    CompanyRepository companyRepository;
    ProjectRepository projectRepository;
    PersonRepository personRepository;

    public CompanyService(CompanyRepository companyRepository, ProjectRepository projectRepository, PersonRepository personRepository) {this.companyRepository = companyRepository; this.projectRepository = projectRepository; this.personRepository = personRepository;}

    public List<Company> getAll() {
        return companyRepository.getAll();
    }

    public Company get(String uuid) {
        return companyRepository.get(uuid);
    }

    public List<Project> getProjectsAssociatedToCompany(String uuid) {
        return projectRepository.getProjectsAssociatedToCompany(uuid);
    }

    public List<Person> getMembersAssociatedToCompany(String uuid) {
        return personRepository.getPersonsAssociatedToCompany(uuid);
    }
}
