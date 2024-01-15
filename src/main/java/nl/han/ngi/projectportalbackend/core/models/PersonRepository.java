package nl.han.ngi.projectportalbackend.core.models;

import nl.han.ngi.projectportalbackend.core.configurations.DbConnectionConfiguration;
import nl.han.ngi.projectportalbackend.core.exceptions.NoPersonFoundException;
import nl.han.ngi.projectportalbackend.core.exceptions.PersonAlreadyExistsException;
import nl.han.ngi.projectportalbackend.core.exceptions.PersonCouldNotBeDeletedException;
import nl.han.ngi.projectportalbackend.core.exceptions.PersonNotFoundException;
import nl.han.ngi.projectportalbackend.core.models.mappers.IMapper;
import org.neo4j.driver.Driver;
import org.neo4j.driver.Result;
import org.neo4j.driver.Value;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

import static org.neo4j.driver.Values.parameters;


@Component
public class PersonRepository {

    @Autowired
    private IMapper<Result, Person> mapper;

    private Driver driver;
    @Autowired
    private DbConnectionConfiguration db;


    public PersonRepository(){
    }

    public List<Person> getAll(){
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH (p:Person) RETURN p";
        var result = session.run(query);
        if (!result.hasNext()) {
            throw new NoPersonFoundException();
        }
        return mapper.mapToList(result);
    }

    public Person getPerson(String email){
        driver = db.getDriver();
        try (var session = driver.session()) {
            var query = "MATCH (p:Person {email: $email}) RETURN p";
            var result = session.run(query, parameters("email", email));

            if (!result.hasNext()) {
                throw new PersonNotFoundException(email);
            }

            var record = result.next();
            var node = record.get("p").asNode();
            String name = node.get("name").asString();
            List<String> status = node.get("status").asList(Value::asString);
            String password = node.get("password").asString();
            return new Person(name, email, password, status);
        }
    }

    public Person createPerson(Person person) {
        System.out.println("Creating person: " + person.getName());
        System.out.println("Creating person: " + person.getEmail());
        System.out.println("Creating person: " + person.getStatus());
        System.out.println("Creating person: " + person.getPassword());
        driver = db.getDriver();
        try (var session = driver.session()) {
            var query = "MERGE (p:Person {email: $email}) ON CREATE SET p.name = $name, p.status = $status, p.password = $password RETURN p";
            var result = session.run(query, parameters(
                    "name", person.getName(),
                    "email", person.getEmail(),
                    "status", person.getStatus(),
                    "password", person.getPassword()
            ));

            if (!result.hasNext()) {
                throw new PersonAlreadyExistsException(person.getEmail());
            }

            return mapper.mapTo(result);
        }
    }

    public Person updatePerson(String email, Person person){
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH (p:Person {email: $email}) SET p.name = $name, p.email = $mail, p.status = $status RETURN p";
        var result = session.run(query, parameters("email", email, "name", person.getName(), "mail", person.getEmail(), "status", person.getStatus()));
        if (!result.hasNext()){
            throw new PersonNotFoundException(email);
        }

        return mapper.mapTo(result);
    }

    public void deletePerson(String email){
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH(p:Person {email: $email}) DELETE p";
        var result = session.run(query, parameters("email", email));
        if (result.hasNext()){
            throw new PersonCouldNotBeDeletedException(email);
        }
    }
}
