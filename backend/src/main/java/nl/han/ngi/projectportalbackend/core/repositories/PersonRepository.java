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

    public VerificationResponse verifyPerson(String uuid) {
        driver = db.getDriver();
        try (var session = driver.session()) {
            var checkQuery = "MATCH (p:Person {uuid: $uuid}) RETURN p.status AS status";
            var checkResult = session.run(checkQuery, parameters("uuid", uuid));
            if (checkResult.hasNext()) {
                var record = checkResult.next();
                var statuses = record.get("status").asList();
                if (statuses.isEmpty()) {
                    throw new PersonIsAGuestException(uuid);
                } else if (statuses.contains("DEELNEMER") || statuses.contains("OPDRACHTGEVER") || statuses.contains("ADMIN")) {
                    return new VerificationResponse(VerificationStatus.ALREADY_VERIFIED);
                }
            } else {
                throw new PersonNotFoundException(uuid);
            }

            var updateQuery = "MATCH (p:Person {uuid: $uuid}) SET p.status = ['DEELNEMER']";
            session.run(updateQuery, parameters("uuid", uuid));
            return new VerificationResponse(VerificationStatus.SUCCESS);
        } catch (Exception e) {
            return new VerificationResponse(VerificationStatus.ERROR);
        }
    }

    public Person getPerson(String uuid){
        driver = db.getDriver();
        try (var session = driver.session()) {
            var query = "MATCH (p:Person {uuid: $uuid}) RETURN p";
            var result = session.run(query, parameters("uuid", uuid));

            if (!result.hasNext()) {
                throw new PersonNotFoundException(uuid);
            }

            return personMapper.mapTo(result);
        }
    }

    public Person getPersonByEmail(String email){
        driver = db.getDriver();
        try (var session = driver.session()) {
            var query = "MATCH (p:Person {email: $email}) RETURN p";
            var result = session.run(query, parameters("email", email));

            if (!result.hasNext()) {
                throw new PersonNotFoundException(email);
            }

            return personMapper.mapTo(result);
        }
    }

    public boolean doesPersonExistByEmail(String email) {
        driver = db.getDriver();
        try (var session = driver.session()) {
            var query = "MATCH (p:Person {email: $email}) RETURN p";
            var result = session.run(query, parameters("email", email));
            return result.hasNext();
        }
    }

    public boolean doesPersonExists(String uuid){
        driver = db.getDriver();
        try (var session = driver.session()) {
            var query = "MATCH (p:Person {uuid: $uuid}) RETURN p";
            var result = session.run(query, parameters("uuid", uuid));
            return result.hasNext();
        }
    }

    public Person createPerson(Person person) {
        driver = db.getDriver();
        try (var session = driver.session()) {
            var query = "CREATE (p:Person {email: $email, name: $name, status: $status, password: $password, uuid: randomUUID()}) RETURN p";
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
            var query = "CREATE (p:Person {email: $email, name: $name, status: $status, uuid: randomUUID()}) RETURN p";
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

    public Person updatePerson(String uuid, Person person){
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH (p:Person {uuid: $uuid}) SET p.name = $name, p.email = $mail, p.status = $status, p.pictureUrl = $pictureUrl RETURN p";
        var result = session.run(query, parameters("uuid", uuid, "name", person.getName(), "mail", person.getEmail(), "status", person.getStatus(), "pictureUrl", person.getPictureUrl()));
        if (!result.hasNext()){
            throw new PersonNotFoundException(uuid);
        }

        return personMapper.mapTo(result);
    }
    public void patchPerson(String uuid, Person person) {
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH(p:Person {id: $id}) SET p.name = $name, p.email = $email, p.status = $status RETURN p";
        var result = session.run(query, parameters("uuid", uuid, "name", person.getName(), "email", person.getEmail(), "status", person.getStatus()));
    }
    public void deletePerson(String uuid){
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH(p:Person {uuid: $uuid}) DELETE p";
        var result = session.run(query, parameters("uuid", uuid));
        if (result.hasNext()){
            throw new PersonCouldNotBeDeletedException(uuid);
        }
    }
}
