package nl.han.ngi.projectportalbackend.core.repositories;

import nl.han.ngi.projectportalbackend.core.configurations.DbConnectionConfiguration;
import nl.han.ngi.projectportalbackend.core.exceptions.*;
import nl.han.ngi.projectportalbackend.core.models.Person;
import nl.han.ngi.projectportalbackend.core.models.Project;
import nl.han.ngi.projectportalbackend.core.models.mappers.IMapper;
import org.neo4j.driver.Driver;
import org.neo4j.driver.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.neo4j.driver.Values.parameters;

@Component
public class ProjectRepository implements CRUDRepository<String, Project>{

    private Driver driver;

    private final IMapper<Result, Project> mapper;
    private final DbConnectionConfiguration db;

    public ProjectRepository(IMapper<Result, Project> mapper, DbConnectionConfiguration db){

        this.mapper = mapper;
        this.db = db;
    }

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
    @Override
    public Project get(String key) {
        return null;
    }

    @Override
    public Project create(Project data) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public Project update(String key, Project data) {
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH(pr:Project {title: $title}) SET pr.title = $newTitle, pr.description = $description RETURN pr";

        var result = session.run(query, parameters("title", key, "newTitle", data.getTitle(), "description", data.getDescription()));

        if(!result.hasNext()){
            throw new ProjectNotFoundException(key);
        }
        return mapper.mapTo(result);
    }

    @Override
    public Project delete(String key) {
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH(pr:Project {title: $title}) DETACH DELETE pr";
        var result = session.run(query, parameters("title", key));
        if (!result.hasNext()){
            throw new ProjectCouldNotBeDeletedException(key);
        }
        return mapper.mapTo(result);
    }

    public List<Project> getAllByUser(String email){
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH (p:Person {email: $email})-[:LEADS]->(pr:Project) RETURN pr.title AS title, pr.description AS description, pr.created AS created";
        var result = session.run(query, parameters("email", email));
        if (!result.hasNext()) {
            return Collections.emptyList();
        }

        List<Project> projects = new ArrayList<>();
        while (result.hasNext()) {
            var record = result.next();
            Project project = new Project();
            project.setTitle(record.get("title").asString());
            project.setDescription(record.get("description").asString());
            project.setCreated(record.get("created").asLocalDate().toString());
            projects.add(project);
        }
        return projects;
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
        var query = "MATCH(p:Person{email:$creator}) CREATE (pr:Project {title: $title, description: $description, created: $created}), (p)-[:LEADS {title: 'project manager'}]->(pr) RETURN pr";

        LocalDate localDate = LocalDate.now(ZoneId.of("Europe/Amsterdam"));
        var result = session.run(query, parameters("creator", creator,"title", project.getTitle(),"description", project.getDescription(), "created", localDate));

        if(!result.hasNext()){
            throw new ProjectAlreadyExistsException(project.getTitle());
        }
        return mapper.mapTo(result);
    }

    public boolean existsByTitle(String title) {
        driver = db.getDriver();
        try (var session = driver.session()) {
            var query = "MATCH (pr:Project {title: $title}) RETURN count(pr) > 0 as exists";
            var result = session.run(query, parameters("title", title));
            return result.single().get("exists").asBoolean();
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
