package nl.han.ngi.projectportalbackend.core.models.mappers;

import nl.han.ngi.projectportalbackend.core.models.Guest;
import org.neo4j.driver.Result;
import org.neo4j.driver.Value;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
@Component
public class ResultToUnverifiedPersonMapper implements IMapper<Result, Guest> {
    @Override
    public Guest mapTo(Result from) {
        Guest unverifiedPerson = new Guest();
        var res = from.next();
        var node = res.get("p").asNode();
        unverifiedPerson.setName(node.get("name").asString());
        unverifiedPerson.setEmail(node.get("email").asString());
        unverifiedPerson.setStatus(node.get("status").asList(Value::asString));

        return unverifiedPerson;
    }

    @Override
    public Guest mapTo(List<Result> from) {
        return null;
    }

    @Override
    public Result mapFrom(Guest to) {
        return null;
    }

    @Override
    public Result mapFrom(List<Guest> to) {
        return null;
    }

    @Override
    public List<Guest> mapToList(Result from) {
        List<Guest> unverifiedPersonList = new ArrayList<>();
        while(from.hasNext()){
            unverifiedPersonList.add(mapTo(from));
        }
        return unverifiedPersonList;
    }

    @Override
    public List<Guest> mapToList(List<Result> from) {
        return null;
    }

    @Override
    public List<Result> mapFromList(Guest to) {
        return null;
    }

    @Override
    public List<Result> mapFromList(List<Guest> to) {
        return null;
    }
}

