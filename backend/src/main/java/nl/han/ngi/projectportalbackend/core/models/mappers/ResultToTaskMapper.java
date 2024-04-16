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
        var res = from.next();
        var node = res.get("p").asNode();
        task.setTitle(node.get("title").asString());
        task.setDescription(node.get("description").asString());
        task.setSkills(node.get("skills").asList(Value::asString));
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
        while(from.hasNext()){
            taskList.add(mapTo(from));
        }
        return null;
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
