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

@Service
public class CompanyService {

    private final EmailService emailService;
    CompanyRepository companyRepository;
    ProjectRepository projectRepository;
    PersonRepository personRepository;

    public CompanyService(EmailService emailService, CompanyRepository companyRepository, ProjectRepository projectRepository, PersonRepository personRepository) {
        this.emailService = emailService; this.companyRepository = companyRepository; this.projectRepository = projectRepository; this.personRepository = personRepository;}

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

    public void acceptApplicantStatusToCompany(String uuid, String userUuid, String role) {
            companyRepository.acceptApplicantToCompany(uuid, userUuid, role);
    }

    public void rejectApplicantStatusToCompany(String uuid, String userUuid, String reason, String email) {

        String emailSubject = "Your application has been rejected";
        String emailText = "Dear applicant, \n\n" + "We regret to inform you that your application has been rejected. The reason for this is: " + reason + "\n\n" + "Kind regards, \n\n" + "The Project Portal Team";
        emailService.sendSimpleEmail(email, emailSubject, emailText);
        companyRepository.rejectApplicantToCompany(uuid, userUuid);
    }
}
