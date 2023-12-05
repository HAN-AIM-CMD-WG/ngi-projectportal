package nl.han.ngi.projectportalbackend.core.models;

import nl.han.ngi.projectportalbackend.core.configurations.DbConnectionConfiguration;
import org.neo4j.driver.Driver;
import org.neo4j.driver.Value;
import org.neo4j.driver.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

import static org.neo4j.driver.Values.parameters;


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
        var query = "match (p:Person {name: $name}) return p";
        var result = session.run(query, parameters("name", name));
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

    public Person getPersonById(int id){
        driver = db.getDriver();
        var session = driver.session();
        var query = "match (p:Person) where split(elementId(p), ':')[2] = $id return p";
        var result = session.run(query, parameters("$id", id));
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
        var query = "MERGE (p:Person {name: $name, email: $email, status: $status}) return p";
        var result = session.run(query, parameters("name", person.getName(), "email", person.getEmail(), "status", person.getStatus()));

        if (!result.hasNext()){
            System.out.println("Er ging iets mis");
        }

        return person;
    }

    public Person updatePerson(int id, Person person){
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH (p:Person) where split(elementId(p), ':')[2] = $id set p.name = $name, p.email = $email, p.status = $status return p";
        var result = session.run(query, parameters("id", id, "name", person.getName(), "email", person.getEmail(), "status", person.getStatus()));

        if (!result.hasNext()){
            System.out.println("Er ging iets mis");
        }

        Person returnedPerson = new Person();
        var res = result.next();
        List<Pair<String, Value>> values = res.fields();
        for (Pair<String, Value> nameValue: values) {
            if ("p".equals(nameValue.key())) {
                Value value = nameValue.value();
                returnedPerson.setName(value.get("name").asString());
                returnedPerson.setEmail(value.get("email").asString());
                returnedPerson.setStatus(value.get("status").asList().stream().map( Object::toString ).collect( Collectors.toList()));
            }
        }

        return returnedPerson;
    }

    public void deletePerson(int id){
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH(p:Person) WHERE SPLIT(elementId(p), ':')[2] = $id DELETE p";
        System.out.println("About to run query: " + query + "; With id of: " + id);
        var result = session.run(query, parameters("id", id));
        if (result.hasNext()){
            System.out.println("Er ging iets mis met het verwijderen");
        }
    }
}
