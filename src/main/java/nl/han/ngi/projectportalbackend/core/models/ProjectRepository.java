package nl.han.ngi.projectportalbackend.core.models;

import nl.han.ngi.projectportalbackend.core.configurations.DbConnectionConfiguration;
import org.neo4j.driver.Driver;
import org.neo4j.driver.Value;
import org.neo4j.driver.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

import static org.neo4j.driver.Values.parameters;

@Component
public class ProjectRepository {

    private Driver driver;
    @Autowired
    private DbConnectionConfiguration db;

    public ProjectRepository(){

    }
    public Project getProject(int id) {
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH (pr: Project) WHERE SPLIT(elementId(pr), ':')[2] = $id RETURN pr";
        var result = session.run(query, parameters("id", id));

        if(!result.hasNext()){
            System.out.println("er is niks gevonden");
        }

        Project project = new Project();
        var res = result.next();
        List<Pair<String, Value>> values = res.fields();
        for (Pair<String, Value> nameValue: values) {
            if ("p".equals(nameValue.key())) {
                Value value = nameValue.value();
                project.setTitle(value.get("title").asString());
                project.setDescription(value.get("description").asString());
            }
        }
        return project;
    }

    public Project createProject(Project project, int creator){
        driver = db.getDriver();
        var session = driver.session();
        var query = "MERGE (pr:Project {title: $title, description: $description}) return pr";
        /*TO DO: edit query to get the creator of the project and link it with a relationship */

        var result = session.run(query, parameters("title", project.getTitle(), "description", project.getDescription()));


        return project;
    }
}
