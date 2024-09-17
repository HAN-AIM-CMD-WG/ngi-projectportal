package nl.han.ngi.projectportalbackend.core.repositories;

import nl.han.ngi.projectportalbackend.core.configurations.DbConnectionConfiguration;
import nl.han.ngi.projectportalbackend.core.models.Applicant;
import nl.han.ngi.projectportalbackend.core.models.Company;
import nl.han.ngi.projectportalbackend.core.models.Person;
import nl.han.ngi.projectportalbackend.core.models.Project;
import nl.han.ngi.projectportalbackend.core.models.mappers.IMapper;
import org.neo4j.driver.Driver;
import org.neo4j.driver.Result;
import org.springframework.stereotype.Repository;

import java.util.List;

import static org.neo4j.driver.Values.parameters;

@Repository
public class CompanyRepository implements CRUDRepository<String, Company> {

    private final IMapper<Result, Person> personMapper;
    private final IMapper<Result, Project> projectMapper;
    private final IMapper<Result, Company> companyMapper;
    private final IMapper<Result, Applicant> applicantMapper;
    private Driver driver;
    private final DbConnectionConfiguration db;

    public CompanyRepository(IMapper<Result, Person> personMapper, IMapper<Result, Project> projectMapper, IMapper<Result, Company> companyMapper, IMapper<Result, Applicant> applicantMapper, DbConnectionConfiguration db) {
        this.personMapper = personMapper;
        this.projectMapper = projectMapper;
        this.companyMapper = companyMapper;
        this.applicantMapper = applicantMapper;
        this.db = db;
    }

    @Override
    public List<Company> getAll() {
        driver = db.getDriver();
        var session = driver.session();
        String query = "MATCH (c:Company) RETURN c";
        var result = session.run(query);
        return companyMapper.mapToList(result);
    }

    @Override
    public Company get(String key) {
        driver = db.getDriver();
        var session = driver.session();
        String query = "MATCH (c:Company {uuid: $uuid}) RETURN c";
        var result = session.run(query, parameters("uuid", key));
        return companyMapper.mapTo(result);
    }

    @Override
    public Company create(Company data) {
        driver = db.getDriver();
        var session = driver.session();
        return data;
    }

    @Override
    public Company update(String key, Company data) {
        driver = db.getDriver();
        var session = driver.session();
        return data;
    }

    @Override
    public Company delete(String key) {
        driver = db.getDriver();
        var session = driver.session();
        return null;
    }

    public List<Person> getPersonsAssociatedToCompany(String uuid) {
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH(p:Person)-[:COMPANY_CREATOR|COMPANY_MEMBER]->(Company{uuid:$uuid}) RETURN p";
        var result = session.run(query, parameters("uuid", uuid));
        return personMapper.mapToList(result);
    }

    public List<Applicant> getApplicantsAssociatedToCompany(String uuid) {
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH(p:Person)-[:COMPANY_APPLICANT]-(Company{uuid:$uuid}) RETURN p";
        var result = session.run(query, parameters("uuid", uuid));
        return applicantMapper.mapToList(result);
    }

    public void acceptApplicantToCompany(String uuid, String userUuid, String role) {
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH(p:Person{uuid:$userUuid})-[cl:COMPANY_APPLICANT]->(c:Company{uuid:$uuid}) DELETE cl CREATE(p)-[:COMPANY_MEMBER{role:$role}]->(c)";
        session.run(query, parameters("userUuid", userUuid, "uuid", uuid, "role", role));
    }

    public void rejectApplicantToCompany(String uuid, String userUuid) {
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH(p:Person{uuid:$userUuid})-[cl:COMPANY_APPLICANT]->(c:Company{uuid:$uuid}) DELETE cl";
        session.run(query, parameters("userUuid", userUuid, "uuid", uuid));
    }

    public Company getCompanyAssociatedToPerson(String uuid) {
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH(p:Person{uuid:$uuid})-[]->(c:Company) RETURN c";
        var result = session.run(query, parameters("uuid", uuid));
        return companyMapper.mapTo(result);
    }
}
