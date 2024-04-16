package nl.han.ngi.projectportalbackend.core.models.mappers;

import nl.han.ngi.projectportalbackend.core.models.Person;
import org.neo4j.driver.Result;
import org.neo4j.driver.Value;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ResultToPersonMapper implements IMapper<Result, Person> {
    @Override
    public Person mapTo(Result from) {
        Person person = new Person();
        var res = from.next();
        var node = res.get("p").asNode();
        person.setName(node.get("name").asString());
        person.setEmail(node.get("email").asString());
        person.setPassword(node.get("password").asString());
        person.setStatus(node.get("status").asList(Value::asString));
        return person;
    }

    @Override
    public Person mapTo(List<Result> from) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public Result mapFrom(Person to) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public Result mapFrom(List<Person> to) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public List<Person> mapToList(Result from) {
        List<Person> personList = new ArrayList<>();
        while(from.hasNext()){
            personList.add(mapTo(from));
        }
        return personList;
    }

    @Override
    public List<Person> mapToList(List<Result> from) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public List<Result> mapFromList(Person to) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public List<Result> mapFromList(List<Person> to) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }
}
