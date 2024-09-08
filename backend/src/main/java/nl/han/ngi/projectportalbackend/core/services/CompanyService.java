package nl.han.ngi.projectportalbackend.core.services;

import nl.han.ngi.projectportalbackend.core.models.Applicant;
import nl.han.ngi.projectportalbackend.core.models.Company;
import nl.han.ngi.projectportalbackend.core.models.Person;
import nl.han.ngi.projectportalbackend.core.models.Project;
import nl.han.ngi.projectportalbackend.core.repositories.CompanyRepository;
import nl.han.ngi.projectportalbackend.core.repositories.PersonRepository;
import nl.han.ngi.projectportalbackend.core.repositories.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

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
        return companyRepository.getPersonsAssociatedToCompany(uuid);
    }

    public List<Applicant> getApplicantsAssociatedToCompany(String uuid) {
        return companyRepository.getApplicantsAssociatedToCompany(uuid);
    }

    public void updateApplicantStatusToCompany(String uuid, String userUuid, String status) {
        if(status.equals("ACCEPTED")){
            companyRepository.acceptApplicantToCompany(uuid, userUuid);
        } else if(status.equals("REJECTED")){
            companyRepository.rejectApplicantToCompany(uuid, userUuid);
        }
    }
}
