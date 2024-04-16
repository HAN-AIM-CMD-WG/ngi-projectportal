package nl.han.ngi.projectportalbackend.core.repositories;

import nl.han.ngi.projectportalbackend.core.configurations.DbConnectionConfiguration;
import nl.han.ngi.projectportalbackend.core.models.Task;
import nl.han.ngi.projectportalbackend.core.models.mappers.IMapper;
import org.neo4j.driver.Driver;
import org.neo4j.driver.Result;
import org.neo4j.driver.Session;
import org.springframework.stereotype.Repository;

import java.util.List;

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
        Task createdTask = new Task();


        return createdTask;
    }

    public Task createTaskForProject(String creator, String projectTitle, Task task){
        Task createdTask = new Task();
        driver = db.getDriver();
        Session session = driver.session();

        String relationQuery = "MATCH(p:Person {email: $creator}),(pr2:Project {title: $projectTitle}), (t1 {title: $taskTitle}) CREATE(p2)-[:CREATED_TASK_FOR_PROJECT]->(t1)-[:PART_OF_PROJECT]->(pr2)";
        return createdTask;
    }
}
