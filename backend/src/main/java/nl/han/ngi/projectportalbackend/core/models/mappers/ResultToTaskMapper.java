package nl.han.ngi.projectportalbackend.core.models.mappers;

import nl.han.ngi.projectportalbackend.core.models.Task;
import org.neo4j.driver.Result;
import org.neo4j.driver.Value;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ResultToTaskMapper implements IMapper<Result, Task>{
    @Override
    public Task mapTo(Result from) {
        Task task = new Task();
        if (from.hasNext()) {
            var res = from.next();
            if (!res.containsKey("t") || res.get("t").isNull()) {
                throw new RuntimeException("Node 't' is null or not found in the result");
            }
            var node = res.get("t").asNode();

            // Map basic string fields
            task.setUuid(node.get("uuid").asString(null));
            task.setProjectUuid(node.get("projectUuid").asString(null));
            task.setTitle(node.get("title").asString(null));
            task.setDescription(node.get("description").asString(null));
            task.setCategory(node.get("category").asString(null));
            task.setAssignedTo(node.get("assignedTo").asString(null));
            task.setDueDate(node.get("dueDate").asString(null));

            // Map boolean field
            task.setCompleted(node.get("completed").asBoolean(false));

            // Map list fields
            task.setSkills(node.get("skills").asList(Value::asString));
            task.setComments(node.get("comments").asList(Value::asString));
        } else {
            throw new RuntimeException("Result has no next entry");
        }
        return task;
    }

    @Override
    public Task mapTo(List<Result> from) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public Result mapFrom(Task to) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public Result mapFrom(List<Task> to) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public List<Task> mapToList(Result from) {
        List<Task> taskList = new ArrayList<>();

        while (from.hasNext()) {
            var res = from.next();
            Task task = new Task();

            if (!res.containsKey("t") || res.get("t").isNull()) {
                throw new RuntimeException("Node 't' is null or not found in the result");
            }

            var node = res.get("t").asNode();

            // Map basic string fields
            task.setUuid(node.get("uuid").asString(null));
            task.setProjectUuid(node.get("projectUuid").asString(null));
            task.setTitle(node.get("title").asString(null));
            task.setDescription(node.get("description").asString(null));
            task.setCategory(node.get("category").asString(null));
            task.setAssignedTo(node.get("assignedTo").asString(null));
            task.setDueDate(node.get("dueDate").asString(null));

            // Map boolean field
            task.setCompleted(node.get("completed").asBoolean(false));

            // Map list fields
            task.setSkills(node.get("skills").asList(Value::asString));
            task.setComments(node.get("comments").asList(Value::asString));

            // Add the task to the list
            taskList.add(task);
        }

        return taskList; // Return the list of tasks
    }

    @Override
    public List<Task> mapToList(List<Result> from) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public List<Result> mapFromList(Task to) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public List<Result> mapFromList(List<Task> to) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }
}
