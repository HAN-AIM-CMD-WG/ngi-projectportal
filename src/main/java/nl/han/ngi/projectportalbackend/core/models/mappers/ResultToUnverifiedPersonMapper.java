package nl.han.ngi.projectportalbackend.core.models.mappers;

import nl.han.ngi.projectportalbackend.core.models.Person;
import nl.han.ngi.projectportalbackend.core.models.UnverifiedPerson;
import org.neo4j.driver.Result;
import org.neo4j.driver.Value;

import java.util.ArrayList;
import java.util.List;

public class ResultToUnverifiedPersonMapper implements IMapper<Result, UnverifiedPerson> {
    @Override
    public UnverifiedPerson mapTo(Result from) {
        UnverifiedPerson unverifiedPerson = new UnverifiedPerson();
        var res = from.next();
        var node = res.get("p").asNode();
        unverifiedPerson.setName(node.get("name").asString());
        unverifiedPerson.setEmail(node.get("email").asString());
        unverifiedPerson.setStatus(node.get("status").asList(Value::asString));

        return unverifiedPerson;
    }

    @Override
    public UnverifiedPerson mapTo(List<Result> from) {
        return null;
    }

    @Override
    public Result mapFrom(UnverifiedPerson to) {
        return null;
    }

    @Override
    public Result mapFrom(List<UnverifiedPerson> to) {
        return null;
    }

    @Override
    public List<UnverifiedPerson> mapToList(Result from) {
        List<UnverifiedPerson> unverifiedPersonList = new ArrayList<>();
        while(from.hasNext()){
            unverifiedPersonList.add(mapTo(from));
        }
        return unverifiedPersonList;
    }

    @Override
    public List<UnverifiedPerson> mapToList(List<Result> from) {
        return null;
    }

    @Override
    public List<Result> mapFromList(UnverifiedPerson to) {
        return null;
    }

    @Override
    public List<Result> mapFromList(List<UnverifiedPerson> to) {
        return null;
    }
}

