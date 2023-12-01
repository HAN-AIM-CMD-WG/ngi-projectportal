package nl.han.ngi.projectportalbackend.core.models;

import nl.han.ngi.projectportalbackend.core.configurations.DbConnectionConfiguration;
import org.neo4j.driver.Driver;
import org.neo4j.driver.Value;
import org.neo4j.driver.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@Component
public class PersonRepository {

    private Driver driver;
    @Autowired
    private DbConnectionConfiguration db;


    public PersonRepository(){
    }

    public Person getPerson(String name){
        driver = db.getDriver();
        var session = driver.session();
            var result = session.run("match (p:Person {name: 'Jesse Veldmaat'}) return p");
            if (!result.hasNext()) {
                System.out.println("niks");
            }
            Person person = new Person();
            var res = result.next();
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

    public Person createPerson(Person person) {
        driver = db.getDriver();
        var session = driver.session();
        return new Person("joe", "joe", Arrays.asList("opdrachtgever"));
    }
}
