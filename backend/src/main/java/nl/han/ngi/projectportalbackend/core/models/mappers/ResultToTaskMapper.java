package nl.han.ngi.projectportalbackend.core.models.mappers;

import nl.han.ngi.projectportalbackend.core.models.Task;
import org.neo4j.driver.Result;

import java.util.ArrayList;
import java.util.List;

public class ResultToTaskMapper implements IMapper<Result, Task> {
    @Override
    public Task mapTo(Result from) {
        Task task = new Task();
        var res = from.next();
        var node = res.get("t").asNode();
        task.setTitle(node.get("title").asString());
        task.setDescription(node.get("description").asString());
        task.setCreated(node.get("created").asString());
        return task;
    }

    @Override
    public Task mapTo(List<Result> from) {
        return null;
    }

    @Override
    public Result mapFrom(Task to) {
        return null;
    }

    @Override
    public Result mapFrom(List<Task> to) {
        return null;
    }

    @Override
    public List<Task> mapToList(Result from) {
        List<Task> taskList = new ArrayList<>();
        while(from.hasNext()){
            taskList.add(mapTo(from));
        }
        return taskList;
    }

    @Override
    public List<Task> mapToList(List<Result> from) {
        return null;
    }

    @Override
    public List<Result> mapFromList(Task to) {
        return null;
    }

    @Override
    public List<Result> mapFromList(List<Task> to) {
        return null;
    }
}
