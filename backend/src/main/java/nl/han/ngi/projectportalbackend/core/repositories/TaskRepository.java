package nl.han.ngi.projectportalbackend.core.repositories;

import nl.han.ngi.projectportalbackend.core.configurations.DbConnectionConfiguration;
import nl.han.ngi.projectportalbackend.core.models.Task;
import nl.han.ngi.projectportalbackend.core.models.mappers.IMapper;
import org.neo4j.driver.Driver;
import org.neo4j.driver.Result;
import org.neo4j.driver.Session;
import org.neo4j.driver.Values;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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

    public List<Task> getAllByProjectUuids(List<String> projectUuids) {
        try {
            driver = db.getDriver();
            Session session = driver.session();

            // Construct the query to fetch tasks related to the provided project UUIDs
            String query = "MATCH (t:Task) WHERE t.projectUuid IN $projectUuids RETURN t";
            // Run the query with the provided project UUIDs
            Result result = session.run(query, org.neo4j.driver.Values.parameters("projectUuids", projectUuids));
            return mapper.mapToList(result);
            // Map the result to a list of tasks
        } catch (Exception e) {
            // Handle exceptions
            System.out.println("Failed to fetch tasks by project UUIDs");
            System.out.println(e.getMessage());
            throw new RuntimeException("Failed to fetch tasks by project UUIDs", e);
        }
    }

    public List<Task> getTasks(String projectUuid) {
        List<Task> tasks = new ArrayList<>();
        try {
            driver = db.getDriver();
            try (Session session = driver.session()) {

                String query = "MATCH (p:Project {uuid: $projectUuid})-[:HAS_TASK]->(t:Task) " +
                        "RETURN t";

                Result result = session.run(query, Values.parameters("projectUuid", projectUuid));

                tasks = mapper.mapToList(result);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (driver != null) {
                driver.close();
            }
        }
        return tasks;
    }

    @Override
    public List<Task> getAll() {
        return null;
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

    public Task createTask(String projectUuid, String creator, Task task) {
        System.out.println(creator);
        System.out.println(projectUuid);

        driver = db.getDriver();
        Session session = driver.session();

        String uuid = UUID.randomUUID().toString();
        task.setUuid(uuid);

        var query = "MATCH (p:Person {email: $email}), (proj:Project {uuid: $projectUuid}) " +
                "CREATE (t:Task {uuid: $uuid, projectUuid: $projectUuid, title: $title, description: $description, " +
                "completed: $completed, category: $category, skills: $skills, assignedTo: $assignedTo, " +
                "dueDate: $dueDate, comments: $comments}), " +
                "(p)-[:CREATED_TASK]->(t), " +
                "(proj)-[:HAS_TASK]->(t) " +
                "RETURN t";

        var result = session.run(query, parameters(
                "email", creator,
                "projectUuid", projectUuid,
                "uuid", task.getUuid(),
                "title", task.getTitle(),
                "description", task.getDescription(),
                "completed", task.isCompleted(),
                "category", task.getCategory(),
                "skills", task.getSkills(),
                "assignedTo", task.getAssignedTo(),
                "dueDate", task.getDueDate(),
                "comments", task.getComments()
        ));

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

    public Task createTaskForProject(String uuid, String creator, Task task) {
        driver = db.getDriver();
        Session session = driver.session();

        System.out.println("CREATE TASK FIRED!");

        String taskUuid = UUID.randomUUID().toString();

        String query = "MATCH(p:Person {email: $creator}), (pr:Project {uuid: $uuid}) " +
                "CREATE(t:Task {title: $title, isDone: 0, skills: $skills, uuid: $taskUuid, projectUuid: $uuid}), " +
                "(p)-[:CREATED_TASK_FOR_PROJECT]->(t)-[:PART_OF_PROJECT]->(pr) " +
                "RETURN t";

        var result = session.run(query, parameters(
                "creator", creator,
                "uuid", uuid,
                "title", task.getTitle(),
                "skills", task.getSkills(),
                "taskUuid", taskUuid // Task's UUID
        ));

        return mapper.mapTo(result);
    }
}
