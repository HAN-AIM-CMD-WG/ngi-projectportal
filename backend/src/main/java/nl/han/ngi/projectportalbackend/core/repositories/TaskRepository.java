package nl.han.ngi.projectportalbackend.core.repositories;

import nl.han.ngi.projectportalbackend.core.configurations.DbConnectionConfiguration;
import nl.han.ngi.projectportalbackend.core.models.Task;
import nl.han.ngi.projectportalbackend.core.models.mappers.IMapper;
import org.neo4j.driver.Driver;
import org.neo4j.driver.Result;
import org.neo4j.driver.Session;
import org.springframework.stereotype.Repository;

import java.util.List;

import static org.neo4j.driver.Values.parameters;

@Repository
public class TaskRepository implements CRUDRepository<String, Task>{
    private Driver driver;
    private final IMapper<Result, Task> mapper;
    private final DbConnectionConfiguration db;

    public TaskRepository(IMapper<Result, Task> mapper, DbConnectionConfiguration db) {
        this.mapper = mapper;
        this.db = db;
    }

    @Override
    public List<Task> getAll() {
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH(t:Task) RETURN t";
        var result = session.run(query);
        return mapper.mapToList(result);
    }

    @Override
    public Task get(String key) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public Task create(Task data) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public Task update(String key, Task data) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public Task delete(String key) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }

    public Task createTask(String creator, Task task) {
        driver = db.getDriver();
        Session session = driver.session();
        var query = "MATCH(p:Person{email: $email})" +
                "CREATE(t:Task{title: $title, description: $description, reward: $reward, isDone: 0, skills: $skills}), " +
                "(p)-[:CREATED_TASK]->(t) RETURN t";
        var result = session.run(query, parameters("email", creator,"title", task.getTitle(), "description", task.getDescription(), "reward", task.getReward(), "skills", task.getSkills()));

        return mapper.mapTo(result);
    }

    public List<Task> getTasksOfProjectWithTitle(String title){
        driver = db.getDriver();
        Session session = driver.session();
        var query = "MATCH(pr:Project {title: $title})--(t:Task) RETURN t";
        var result = session.run(query, parameters("title", title));
        return mapper.mapToList(result);
    }

    public List<Task> getTasksOfProject(String uuid) {
        driver = db.getDriver();
        Session session = driver.session();
        var query = "MATCH(pr:Project {uuid: $uuid})--(t:Task) RETURN t";
        var result = session.run(query, parameters("uuid", uuid));
        return mapper.mapToList(result);
    }

    public List<Task> getAvailableTasksOfPerson(String person) {
        driver = db.getDriver();
        Session session = driver.session();
        var query = "MATCH(p:Person {email:$email})-[:TASK_MANAGER]->(t:Task) return t";
        var result = session.run(query, parameters("email", person));
        return mapper.mapToList(result);
    }

    public Task createTaskForProject(String creator, String uuid, Task task){
        driver = db.getDriver();
        Session session = driver.session();
        String query = "MATCH(p:Person {email: $creator}),(pr:Project {uuid: $uuid}) " +
                "CREATE(t:Task {title:$title, description:$description, reward:$reward, isDone: 0, skills:$skills}) " +
                "(p)-[:CREATED_TASK_FOR_PROJECT]->(t)-[:PART_OF_PROJECT]->(pr) return t";
        var result = session.run(query, parameters("creator", creator, "uuid", uuid, "title", task.getTitle(), "description", task.getDescription(), "reward", task.getReward(), "skills", task.getSkills()));
        return mapper.mapTo(result);
    }



}
