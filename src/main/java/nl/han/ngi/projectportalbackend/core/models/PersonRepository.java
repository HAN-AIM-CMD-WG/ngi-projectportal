package nl.han.ngi.projectportalbackend.core.models;

import nl.han.ngi.projectportalbackend.core.configurations.DbConnectionConfiguration;
import nl.han.ngi.projectportalbackend.core.exceptions.*;
import nl.han.ngi.projectportalbackend.core.models.mappers.IMapper;
import org.neo4j.driver.Driver;
import org.neo4j.driver.Result;
import org.neo4j.driver.Value;
import org.neo4j.driver.exceptions.ClientException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

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

            return mapper.mapTo(result);
        }
    }

    public Person createPerson(Person person) {
        driver = db.getDriver();
        try (var session = driver.session()) {
            var query = "CREATE (p:Person {email: $email, name: $name, status: $status, password: $password}) RETURN p";
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

    public UnverifiedPerson createUnverifiedPerson(UnverifiedPerson unverifiedPerson) {
        driver = db.getDriver();
        try (var session = driver.session()) {
            UnverifiedPerson person = new UnverifiedPerson();
            var query = "CREATE (p:Person {email: $email, name: $name, status: $status}) RETURN p";
            var result = session.run(query, parameters(
                    "name", unverifiedPerson.getName(),
                    "email", unverifiedPerson.getEmail(),
                    "status", unverifiedPerson.getStatus()
            ));

            var res = result.next();
            var node = res.get("p").asNode();
            person.setName(node.get("name").asString());
            person.setEmail(node.get("email").asString());
            person.setStatus(node.get("status").asList(Value::asString));

            return person;
        }
    }

    public Person updatePerson(String email, Person person){
        driver = db.getDriver();
        var session = driver.session();
        var checkQuery = "MATCH (p:Person {email: $email}) RETURN p";
        var checkResult = session.run(checkQuery, parameters("email", person.getEmail()));
        if(checkResult.hasNext()){
            throw new PersonAlreadyExistsException(person.getEmail());
        }
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
