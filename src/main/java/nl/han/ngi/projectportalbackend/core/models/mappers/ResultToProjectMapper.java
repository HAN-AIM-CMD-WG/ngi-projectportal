package nl.han.ngi.projectportalbackend.core.models.mappers;

import nl.han.ngi.projectportalbackend.core.models.Project;
import org.neo4j.driver.Result;
import org.neo4j.driver.Value;
import org.neo4j.driver.util.Pair;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ResultToProjectMapper implements IMapper<Result, Project>{
    @Override
    public Project mapTo(Result from) {
        Project project = new Project();
        var res = from.next();
        List<Pair<String, Value>> values = res.fields();
        for (Pair<String, Value> nameValue: values) {
            if ("pr".equals(nameValue.key())) {
                Value value = nameValue.value();
                project.setTitle(value.get("title").asString());
                project.setDescription(value.get("description").asString());
            }
        }
        return null;
    }

    @Override
    public Project mapTo(List<Result> from) {
        return null;
    }

    @Override
    public Result mapFrom(Project to) {
        return null;
    }

    @Override
    public Result mapFrom(List<Project> to) {
        return null;
    }

    @Override
    public List<Project> mapToList(Result from) {
        List<Project> projectList = new ArrayList<>();
        while(from.hasNext()){
            var res = from.next();
            List<Pair<String, Value>> values = res.fields();
            for (Pair<String, Value> nameValue : values) {
                if ("pr".equals(nameValue.key())) {
                    Project project = new Project();
                    Value value = nameValue.value();
                    project.setTitle(value.get("title").asString());
                    project.setDescription(value.get("description").asString());
                    projectList.add(project);
                }
            }
        }
        return projectList;
    }

    @Override
    public List<Project> mapToList(List<Result> from) {
        return null;
    }

    @Override
    public List<Result> mapFromList(Project to) {
        return null;
    }

    @Override
    public List<Result> mapFromList(List<Project> to) {
        return null;
    }
}
