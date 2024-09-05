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
                if ("pr".equals(nameValue.key())) {
                    Value value = nameValue.value();
                    project.setUuid(value.get("uuid").asString());
                    project.setTitle(value.get("title").asString());
                    project.setDescription(value.get("description").asString());
                    project.setCreated(value.get("created").asLocalDate());
                    System.out.println("Mapped project: " + project);
                }

                if ("tasks".equals(nameValue.key())) {
                    List<Object> taskObjects = nameValue.value().asList();

                    for (Object taskObject : taskObjects) {
                        Value taskValue = (Value) taskObject;
                        Task task = new Task();
                        task.setUuid(taskValue.get("uuid").asString());
                        task.setTitle(taskValue.get("title").asString());
                        task.setSkills(taskValue.get("skills").asList(Value::asString));
                        task.setIsDone(taskValue.get("isDone").asInt());
                        tasks.add(task);
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
