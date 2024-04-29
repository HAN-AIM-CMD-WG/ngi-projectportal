package nl.han.ngi.projectportalbackend.core.repositories;

import nl.han.ngi.projectportalbackend.core.configurations.DbConnectionConfiguration;
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
    private Driver driver;
    private final DbConnectionConfiguration db;

    public CompanyRepository(IMapper<Result, Person> personMapper, IMapper<Result, Project> projectMapper, IMapper<Result, Company> companyMapper, DbConnectionConfiguration db) {
        this.personMapper = personMapper;
        this.projectMapper = projectMapper;
        this.companyMapper = companyMapper;
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
        return null;
    }

    @Override
    public Company create(Company data) {
        driver = db.getDriver();
        var session = driver.session();
        return null;
    }

    @Override
    public Company update(String key, Company data) {
        driver = db.getDriver();
        var session = driver.session();
        return null;
    }

    @Override
    public Company delete(String key) {
        driver = db.getDriver();
        var session = driver.session();
        return null;
    }

    public List<Project> getAllProjectsAssociatedWithCompany(String company) {
        driver = db.getDriver();
        var session = driver.session();
        String query = "";
        var result = session.run(query, parameters("company", company));
        return projectMapper.mapToList(result);
    }

    public List<Person> getAllPersonsAssociatedWithCompany(String company) {
        driver = db.getDriver();
        var session = driver.session();
        String query = "";
        var result = session.run(query, parameters("company", company));
        return personMapper.mapToList(result);
    }
}
