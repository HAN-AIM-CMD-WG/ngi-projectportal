package nl.han.ngi.projectportalbackend.core.models;

import nl.han.ngi.projectportalbackend.core.configurations.DbConnectionConfiguration;
import org.neo4j.driver.Driver;
import org.neo4j.driver.Value;
import org.neo4j.driver.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

import static org.neo4j.driver.Values.parameters;

@Component
public class ProjectRepository {

    private Driver driver;
    @Autowired
    private DbConnectionConfiguration db;

    public ProjectRepository(){

    }

    public List<Project> getAll(){
        List<Project> projectList = new ArrayList<>();
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH (pr: Project) RETURN pr";
        var result = session.run(query);
        if (!result.hasNext()) {
            System.out.println("niks");
        }

        while(result.hasNext()){
            var res = result.next();
            List<Pair<String, Value>> values = res.fields();
            for (Pair<String, Value> nameValue : values) {
                if ("pr".equals(nameValue.key())) {
                    Project project = new Project();
                    Value value = nameValue.value();
                    project.setTitle(value.get("title").asString());
                    project.setDescription(value.get("description").asString());
                    projectList.add(project);
                }
            }
        }
        return projectList;
    }
    public Project getProject(String title) {
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH (pr: Project {title: $title})RETURN pr";
        var result = session.run(query, parameters("title", title));

        if(!result.hasNext()){
            System.out.println("er is niks gevonden");
        }

        Project project = new Project();
        var res = result.next();
        List<Pair<String, Value>> values = res.fields();
        for (Pair<String, Value> nameValue: values) {
            if ("pr".equals(nameValue.key())) {
                Value value = nameValue.value();
                project.setTitle(value.get("title").asString());
                project.setDescription(value.get("description").asString());
            }
        }
        return project;
    }

    public Project createProject(Project project, String creator){
        driver = db.getDriver();
        var session = driver.session();
        var query = "MERGE (pr:Project {title: $title}) ON CREATE SET pr.description = $description RETURN pr";

        var result = session.run(query, parameters("title", project.getTitle(), "description", project.getDescription()));

        if(!result.hasNext()){
            System.out.println("test");
        }
        // still a bug where you can create multiple of the same relationships
        query = "MATCH (person:Person{email: $creator}), (pr:Project {title: $title}) CREATE (person)-[:LEADS {title: 'project manager'}]->(pr)";

        session.run(query, parameters("creator", creator, "title", project.getTitle()));
        return project;
    }

    public Project updateProject(String title, Project project) {
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH(pr:Project {title: $title}) SET pr.title = $newTitle, pr.description = $description RETURN pr";

        var result = session.run(query, parameters("title", title, "newTitle", project.getTitle(), "description", project.getDescription()));

        if(!result.hasNext()){
            System.out.println("no project found");
        }

        var res = result.next();
        List<Pair<String, Value>> values = res.fields();
        for (Pair<String, Value> nameValue: values) {
            if ("pr".equals(nameValue.key())) {
                Value value = nameValue.value();
                project.setTitle(value.get("title").asString());
                project.setDescription(value.get("description").asString());
            }
        }
        return project;
    }

    //Note: DOESN'T WORK YET. Don't know why
    public void deleteProject(String title) {
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH(pr:Project {title: '$title'}) DETACH DELETE pr";
        var result = session.run(query, parameters("title", title));
        if (result.hasNext()){
            System.out.println("Er ging iets mis met het verwijderen");
        }
    }
}
