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
            // Change "p" to "t" since the query returns the task node as "t"
            if (!res.containsKey("t") || res.get("t").isNull()) {
                // Handle the case where "t" is null or does not exist
                throw new RuntimeException("Node 't' is null or not found in the result");
            }
            var node = res.get("t").asNode(); // Use "t" here instead of "p"
            task.setUuid(node.get("uuid").asString());
            task.setProjectUuid(node.get("projectUuid").asString());
            task.setTitle(node.get("title").asString());
            task.setSkills(node.get("skills").asList(Value::asString));
            task.setIsDone(node.get("isDone").asInt());
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
            task.setUuid(node.get("uuid").asString());
            task.setProjectUuid(node.get("projectUuid").asString());
            task.setTitle(node.get("title").asString());
            task.setSkills(node.get("skills").asList(Value::asString));
            task.setIsDone(node.get("isDone").asInt());

            taskList.add(task);
        }
        return taskList; // Return the list of tasks instead of null
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
