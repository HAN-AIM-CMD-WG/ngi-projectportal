package nl.han.ngi.projectportalbackend.core.models.mappers;

import nl.han.ngi.projectportalbackend.core.models.Project;
import nl.han.ngi.projectportalbackend.core.models.Task;
import org.neo4j.driver.Result;
import org.neo4j.driver.Value;
import org.neo4j.driver.util.Pair;
import org.springframework.stereotype.Component;
import java.time.LocalDate;

import java.util.ArrayList;
import java.util.List;

@Component
public class ResultToProjectMapper implements IMapper<Result, Project>{
    public Project mapTo(Result from) {
        Project project = new Project();
        List<Task> tasks = new ArrayList<>();

        // Loop over all records in the result
        while (from.hasNext()) {
            var res = from.next();
            List<Pair<String, Value>> values = res.fields();

            for (Pair<String, Value> nameValue : values) {
                // Map the project node
                if ("pr".equals(nameValue.key())) {
                    var node = nameValue.value().asNode();
                    project.setUuid(node.get("uuid").asString(null));
                    project.setTitle(node.get("title").asString(null));
                    project.setDescription(node.get("description").asString(null));
                    project.setCreated(node.get("created").asLocalDate(null));
                    System.out.println("Mapped project: " + project);
                }

                // Map the tasks nodes
                if ("tasks".equals(nameValue.key())) {
                    List<Object> taskObjects = nameValue.value().asList(); // Retrieve list of Object

                    for (Object taskObject : taskObjects) {
                        if (taskObject instanceof Value taskValue) {
                            var taskNode = taskValue.asNode(); // Convert each Value to Node
                            Task task = new Task();

                            // Map Task fields according to the mapToList method for Task
                            task.setUuid(taskNode.get("uuid").asString(null));
                            task.setProjectUuid(taskNode.get("projectUuid").asString(null));
                            task.setTitle(taskNode.get("title").asString(null));
                            task.setDescription(taskNode.get("description").asString(null));
                            task.setCategory(taskNode.get("category").asString(null));
                            task.setAssignedTo(taskNode.get("assignedTo").asString(null));
                            task.setDueDate(taskNode.get("dueDate").asString(null));
                            task.setCompleted(taskNode.get("completed").asBoolean(false));
                            task.setSkills(taskNode.get("skills").asList(Value::asString));
                            task.setComments(taskNode.get("comments").asList(Value::asString));

                            tasks.add(task);
                        }
                    }
                }
            }
        }

        project.setTasks(tasks);
        return project;
    }

    @Override
    public Project mapTo(List<Result> from) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public Result mapFrom(Project to) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public Result mapFrom(List<Project> to) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public List<Project> mapToList(Result from) {
        List<Project> projectList = new ArrayList<>();
        while(from.hasNext()){
            projectList.add(mapTo(from));
        }
        return projectList;
    }

    @Override
    public List<Project> mapToList(List<Result> from) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public List<Result> mapFromList(Project to) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public List<Result> mapFromList(List<Project> to) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }
}
