package nl.han.ngi.projectportalbackend.core.models;

import nl.han.ngi.projectportalbackend.core.configurations.DbConnectionConfiguration;
import nl.han.ngi.projectportalbackend.core.exceptions.*;
import nl.han.ngi.projectportalbackend.core.models.mappers.IMapper;
import org.neo4j.driver.Driver;
import org.neo4j.driver.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static org.neo4j.driver.Values.parameters;

@Component
public class ProjectRepository {

    private Driver driver;

    @Autowired
    private IMapper<Result, Project> mapper;
    @Autowired
    private DbConnectionConfiguration db;

    public List<Project> getAll(){
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH (pr: Project) RETURN pr";
        var result = session.run(query);
        if (!result.hasNext()) {
            throw new NoProjectFoundException();
        }

        return mapper.mapToList(result);
    }
    public Project getProject(String title) {
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH (pr: Project {title: $title}) RETURN pr";
        var result = session.run(query, parameters("title", title));
        if(!result.hasNext()){
            throw new ProjectNotFoundException(title);
        }
        return mapper.mapTo(result);
    }

    public Project createProject(Project project, String creator){
        driver = db.getDriver();
        var session = driver.session();
        var query = "MERGE (pr:Project {title: $title}) ON CREATE SET pr.description = $description, pr.created = $created RETURN pr";

        LocalDate localDate = LocalDate.now(ZoneId.of("Europe/Amsterdam"));
        var result = session.run(query, parameters("title", project.getTitle(), "description", project.getDescription(), "created", localDate));

        if(!result.hasNext()){
            throw new ProjectAlreadyExistsException(project.getTitle());
        }
        query = "MATCH (p:Person{email: $creator}), (pr:Project {title: $title}) MERGE (p)-[:LEADS {title: 'project manager'}]->(pr)";

        session.run(query, parameters("creator", creator, "title", project.getTitle()));
        return mapper.mapTo(result);
    }

    public Project updateProject(String title, Project project) {
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH(pr:Project {title: $title}) SET pr.title = $newTitle, pr.description = $description RETURN pr";

        var result = session.run(query, parameters("title", title, "newTitle", project.getTitle(), "description", project.getDescription()));

        if(!result.hasNext()){
            throw new ProjectNotFoundException(title);
        }
        return mapper.mapTo(result);
    }

    public void deleteProject(String title) {
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH(pr:Project {title: $title}) DETACH DELETE pr";
        var result = session.run(query, parameters("title", title));
        if (!result.hasNext()){
            throw new ProjectCouldNotBeDeletedException(title);
        }
    }

    public void addParticipantToProject(String title, Person person, String function) {
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH (p:Person{email: $email}), (pr:Project {title: $title}) MERGE (p)-[:PARTICIPATES {title: $function}]->(pr)";
        var result = session.run(query, parameters("email", person.getEmail(), "title", title, "function", function));
        if(!result.hasNext()){
            throw new PersonAlreadyAddedToProjectException(title, person.getEmail());
        }
    }

//    public void removeParticipantFromProject(String title, String email) {
//        driver = db.getDriver();
//        var session = driver.session();
//        var query = "";
//        var result = session.run(query, parameters("title", title, "email", email));
//        if(!result.hasNext()){
//            throw new PersonCouldNotBeRemovedException(title, email);
//        }
//    }
}
