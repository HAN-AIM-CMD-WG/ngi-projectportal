package nl.han.ngi.projectportalbackend.core.repositories;

import nl.han.ngi.projectportalbackend.core.configurations.DbConnectionConfiguration;
import nl.han.ngi.projectportalbackend.core.enums.VerificationStatus;
import nl.han.ngi.projectportalbackend.core.exceptions.*;
import nl.han.ngi.projectportalbackend.core.models.Guest;
import nl.han.ngi.projectportalbackend.core.models.Person;
import nl.han.ngi.projectportalbackend.core.models.VerificationResponse;
import nl.han.ngi.projectportalbackend.core.models.mappers.IMapper;
import org.neo4j.driver.Driver;
import org.neo4j.driver.Result;
import org.neo4j.driver.exceptions.ClientException;
import org.neo4j.driver.Value;
import org.neo4j.driver.types.Node;
import org.springframework.stereotype.Repository;


import java.util.ArrayList;
import java.util.List;

import static org.neo4j.driver.Values.parameters;


@Repository
public class PersonRepository {

    private final IMapper<Result, Person> personMapper;

    private final IMapper<Result, Guest> guestMapper;

    private Driver driver;

    private final DbConnectionConfiguration db;

    public PersonRepository(DbConnectionConfiguration db, IMapper<Result, Guest> guestMapper, IMapper<Result, Person> personMapper){
        this.db = db;
        this.guestMapper = guestMapper;
        this.personMapper = personMapper;
    }

    public List<Person> getAll(){
        driver = db.getDriver();
        try (var session = driver.session()) {
            var query = "MATCH (p:Person) RETURN p";
            var result = session.run(query);
            return personMapper.mapToList(result);
        }
    }

    public List<Person> getDeelnemers(){
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH (p:Person) WHERE ANY(status IN p.status WHERE status = 'DEELNEMER') RETURN p";
        var result = session.run(query);
        return personMapper.mapToList(result);
    }

    public VerificationResponse verifyPerson(String id) {
        driver = db.getDriver();
        try (var session = driver.session()) {
            var checkQuery = "MATCH (p:Person {id: id}) RETURN p.status AS status";
            var checkResult = session.run(checkQuery, parameters("id", id));
            if (checkResult.hasNext()) {
                var record = checkResult.next();
                var statuses = record.get("status").asList();
                if (statuses.isEmpty()) {
                    throw new PersonIsAGuestException(id);
                } else if (statuses.contains("DEELNEMER") || statuses.contains("OPDRACHTGEVER") || statuses.contains("ADMIN")) {
                    return new VerificationResponse(VerificationStatus.ALREADY_VERIFIED);
                }
            } else {
                throw new PersonNotFoundException(id);
            }

            var updateQuery = "MATCH (p:Person {id: id}) SET p.status = ['DEELNEMER']";
            session.run(updateQuery, parameters("id", id));
            return new VerificationResponse(VerificationStatus.SUCCESS);
        } catch (Exception e) {
            return new VerificationResponse(VerificationStatus.ERROR);
        }
    }

    public Person getPerson(String id){
        driver = db.getDriver();
        try (var session = driver.session()) {
            var query = "MATCH (p:Person {id: id}) RETURN p";
            var result = session.run(query, parameters("id", id));

            if (!result.hasNext()) {
                throw new PersonNotFoundException(id);
            }

            return personMapper.mapTo(result);
        }
    }

    public boolean doesPersonExist(String id) {
        driver = db.getDriver();
        try (var session = driver.session()) {
            var query = "MATCH (p:Person {id: id}) RETURN p";
            var result = session.run(query, parameters("id", id));
            return result.hasNext();
        }
    }

    public Person createPerson(Person person) {
        driver = db.getDriver();
        try (var session = driver.session()) {
            var query = "CREATE (p:Person {email: $email, name: $name, status: $status, password: $password, id: randomUUID()}) RETURN p";
            var result = session.run(query, parameters(
                    "name", person.getName(),
                    "email", person.getEmail(),
                    "status", person.getStatus(),
                    "password", person.getPassword()
            ));
            if (!result.hasNext()) {
                throw new PersonAlreadyExistsException(person.getEmail());
            }

            return personMapper.mapTo(result);
        }
    }

    public Guest createGuest(Guest guest) {
        driver = db.getDriver();
        try (var session = driver.session()) {
            var query = "CREATE (p:Person {email: $email, name: $name, status: $status, id: randomUUID()}) RETURN p";
            var result = session.run(query, parameters(
                    "name", guest.getName(),
                    "email", guest.getEmail(),
                    "status", guest.getStatus()
            ));
            return guestMapper.mapTo(result);
        } catch (ClientException e) {
            throw new PersonAlreadyExistsException(guest.getEmail());
        }
    }

    public Person updatePerson(String id, Person person){
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH (p:Person {id: id}) SET p.name = $name, p.email = $mail, p.status = $status, p.pictureUrl = $pictureUrl RETURN p";
        var result = session.run(query, parameters("id", id, "name", person.getName(), "mail", person.getEmail(), "status", person.getStatus(), "pictureUrl", person.getPictureUrl()));
        if (!result.hasNext()){
            throw new PersonNotFoundException(id);
        }

        return personMapper.mapTo(result);
    }
    public void patchPerson(String id, Person person) {
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH(p:Person {id: id}) SET p.name = $name, p.email = $email, p.status = $status RETURN p";
        var result = session.run(query, parameters("id", id, "name", person.getName(), "email", person.getEmail(), "status", person.getStatus()));
    }
    public void deletePerson(String id){
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH(p:Person {id: id}) DELETE p";
        var result = session.run(query, parameters("id", id));
        if (result.hasNext()){
            throw new PersonCouldNotBeDeletedException(id);
        }
    }
}
