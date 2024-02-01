package nl.han.ngi.projectportalbackend.core.models.mappers;

import nl.han.ngi.projectportalbackend.core.models.Status;
import org.neo4j.driver.Result;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ResultToStatusMapper implements IMapper<Result, Status>{
    @Override
    public Status mapTo(Result from) {
        Status status = new Status();
        var res = from.next();
        var node = res.get("s").asNode();
        status.setName(node.get("name").asString());

        return status;
    }

    @Override
    public Status mapTo(List<Result> from) {
        return null;
    }

    @Override
    public Result mapFrom(Status to) {
        return null;
    }

    @Override
    public Result mapFrom(List<Status> to) {
        return null;
    }

    @Override
    public List<Status> mapToList(Result from) {
        List<Status> statusList = new ArrayList<>();
        while(from.hasNext()){
            statusList.add(mapTo(from));
        }
        return statusList;
    }

    @Override
    public List<Status> mapToList(List<Result> from) {
        return null;
    }

    @Override
    public List<Result> mapFromList(Status to) {
        return null;
    }

    @Override
    public List<Result> mapFromList(List<Status> to) {
        return null;
    }
}
