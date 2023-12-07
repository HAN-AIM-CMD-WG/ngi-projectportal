package nl.han.ngi.projectportalbackend.core.models;

import nl.han.ngi.projectportalbackend.core.configurations.DbConnectionConfiguration;
import org.neo4j.driver.Driver;
import org.neo4j.driver.Value;
import org.neo4j.driver.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
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

    public List<Person> getAll(){
        List<Person> personList = new ArrayList<>();
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH (p:Person) RETURN p";
        var result = session.run(query);
        if (!result.hasNext()) {
            System.out.println("niks");
        }

        while(result.hasNext()){
            var res = result.next();
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

    public Person getPerson(String name){
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH (p:Person {name: $name}) RETURN p";
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

    public Person getPersonById(String email){
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH (p:Person {email: $email) RETURN p";
        var result = session.run(query, parameters("email", email));
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
        var query = "MERGE (p:Person {email: $email) ON CREATE SET p.name = $name, p.status = $status RETURN p";
        var result = session.run(query, parameters("name", person.getName(), "email", person.getEmail(), "status", person.getStatus()));

        if (!result.hasNext()){
            System.out.println("Er ging iets mis");
        }

        return person;
    }

    public Person updatePerson(String email, Person person){
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH (p:Person {email: $email}) SET p.name = $name, p.email = $mail, p.status = $status RETURN p";
        var result = session.run(query, parameters("email", email, "name", person.getName(), "mail", person.getEmail(), "status", person.getStatus()));

        if (!result.hasNext()){
            System.out.println("Er ging iets mis");
        }

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

    public void deletePerson(String email){
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH(p:Person {email: $email}) DELETE p";
        System.out.println("About to run query: " + query + "; With id of: " + email);
        var result = session.run(query, parameters("email", email));
        if (result.hasNext()){
            System.out.println("Er ging iets mis met het verwijderen");
        }
    }
}
