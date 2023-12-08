package nl.han.ngi.projectportalbackend.core.models.mappers;

import nl.han.ngi.projectportalbackend.core.models.Person;
import org.neo4j.driver.Result;
import org.neo4j.driver.Value;
import org.neo4j.driver.util.Pair;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ResultToPersonMapper implements IMapper<Result, Person> {
    @Override
    public Person mapTo(Result from) {
        Person person = new Person();
        var res = from.next();
        List<Pair<String, Value>> values = res.fields();
        for (Pair<String, Value> nameValue: values) {
            if ("p".equals(nameValue.key())) {
                Value value = nameValue.value();
                person.setName(value.get("name").asString());
                person.setEmail(value.get("email").asString());
                person.setStatus(value.get("status").asList().stream().map( Object::toString ).collect( Collectors.toList()));
            }
        }
        return person;
    }

    @Override
    public Person mapTo(List<Result> from) {
        return null;
    }

    @Override
    public Result mapFrom(Person to) {
        return null;
    }

    @Override
    public Result mapFrom(List<Person> to) {
        return null;
    }

    @Override
    public List<Person> mapToList(Result from) {
        List<Person> personList = new ArrayList<>();
        while(from.hasNext()){
            var res = from.next();
            List<Pair<String, Value>> values = res.fields();
            for (Pair<String, Value> nameValue : values) {
                if ("p".equals(nameValue.key())) {
                    Person person = new Person();
                    Value value = nameValue.value();
                    person.setName(value.get("name").asString());
                    person.setEmail(value.get("email").asString());
                    person.setStatus(value.get("status").asList().stream().map(Object::toString).collect(Collectors.toList()));
                    personList.add(person);
                }
            }
        }
        return personList;
    }

    @Override
    public List<Person> mapToList(List<Result> from) {
        return null;
    }

    @Override
    public List<Result> mapFromList(Person to) {
        return null;
    }

    @Override
    public List<Result> mapFromList(List<Person> to) {
        return null;
    }
}
