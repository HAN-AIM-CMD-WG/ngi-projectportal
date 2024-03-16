package nl.han.ngi.projectportalbackend.core.models;

import nl.han.ngi.projectportalbackend.core.configurations.DbConnectionConfiguration;
import nl.han.ngi.projectportalbackend.core.enums.VerificationStatus;
import nl.han.ngi.projectportalbackend.core.exceptions.*;
import nl.han.ngi.projectportalbackend.core.models.mappers.IMapper;
import nl.han.ngi.projectportalbackend.core.services.EmailService;
import nl.han.ngi.projectportalbackend.responses.VerificationResponse;
import org.neo4j.driver.Driver;
import org.neo4j.driver.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.neo4j.driver.Value;
import org.neo4j.driver.types.Node;


import java.util.ArrayList;
import java.util.List;

import static org.neo4j.driver.Values.parameters;


@Component
public class PersonRepository {

    @Autowired
    private IMapper<Result, Person> personMapper;

    @Autowired
    private IMapper<Result, Guest> unverifiedPersonMapper;

    private Driver driver;

    @Autowired
    private DbConnectionConfiguration db;

    @Autowired
    private EmailService emailService;

    public PersonRepository(){
    }

    public List<Person> getAll(){
        driver = db.getDriver();
        try (var session = driver.session()) {
            var query = "MATCH (p:Person) RETURN p";
            var result = session.run(query);
            List<Person> people = new ArrayList<>();
            while (result.hasNext()) {
                var record = result.next();
                var node = record.get("p").asNode();

                Person person = mapNodeToPerson(node);

                people.add(person);
                System.out.println(person.getEmail() + " - Picture URL: " + person.getPictureUrl());
            }
            return people;
        }
    }

    private Person mapNodeToPerson(Node node) {
        String email = node.get("email").asString(null);
        String name = node.get("name").asString(null);
        String pictureUrl = node.get("pictureUrl").asString(null);
        List<String> status = node.get("status").asList(Value::asString);

        Person person = new Person();
        person.setEmail(email);
        person.setName(name);
        person.setPictureUrl(pictureUrl);
        person.setStatus(status);

        return person;
    }

    public List<Person> getDeelnemers(){
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH (p:Person) WHERE ANY(status IN p.status WHERE status = 'DEELNEMER') RETURN p";
        var result = session.run(query);
        List<Person> people = new ArrayList<>();
        while (result.hasNext()) {
            var record = result.next();
            var node = record.get("p").asNode();

            Person person = mapNodeToPerson(node);

            people.add(person);
        }
        return people;
    }

    public VerificationResponse verifyPerson(String email) {
        driver = db.getDriver();
        try (var session = driver.session()) {
            var checkQuery = "MATCH (p:Person {email: $email}) RETURN p.status AS status";
            var checkResult = session.run(checkQuery, parameters("email", email));
            if (checkResult.hasNext()) {
                var record = checkResult.next();
                var statuses = record.get("status").asList();
                if (statuses.contains("GAST")) {
                    return new VerificationResponse(VerificationStatus.ALREADY_VERIFIED);
                }
            }

            var updateQuery = "MATCH (p:Person {email: $email}) SET p.status = ['GAST'] RETURN p";
            var updateResult = session.run(updateQuery, parameters("email", email));
            if (updateResult.hasNext()) {
                return new VerificationResponse(VerificationStatus.SUCCESS);
            } else {
                throw new PersonNotFoundException(email);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new VerificationResponse(VerificationStatus.ERROR);
        }
    }

    public Person getPerson(String email){
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

    public boolean doesPersonExist(String email) {
        driver = db.getDriver();
        try (var session = driver.session()) {
            var query = "MATCH (p:Person {email: $email}) RETURN p";
            var result = session.run(query, parameters("email", email));
            return result.hasNext();
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

            return personMapper.mapTo(result);
        }
    }

    public Guest createUnverifiedPerson(Guest unverifiedPerson) {
        driver = db.getDriver();
        try (var session = driver.session()) {
            var query = "CREATE (p:Person {email: $email, name: $name, status: $status}) RETURN p";
            var result = session.run(query, parameters(
                    "name", unverifiedPerson.getName(),
                    "email", unverifiedPerson.getEmail(),
                    "status", unverifiedPerson.getStatus()
            ));

            Guest createdGuest = unverifiedPersonMapper.mapTo(result);

            String emailSubject = "Please verify your email address";
            String verificationLink = "http://localhost:5173/verify/" + createdGuest.getEmail();
            String emailContent = "Dear " + createdGuest.getName() + ",\n\nPlease click the following link to verify your email address: " + verificationLink + "\n\nThank you!";
            emailService.sendSimpleEmail(createdGuest.getEmail(), emailSubject, emailContent);

            return createdGuest;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public Person updatePerson(String email, Person person){
        driver = db.getDriver();
        var session = driver.session();
//        var checkQuery = "MATCH (p:Person {email: $email}) RETURN p";
//        var checkResult = session.run(checkQuery, parameters("email", person.getEmail()));
//        if(checkResult.hasNext()){
//            throw new PersonAlreadyExistsException(person.getEmail());
//        }
        var query = "MATCH (p:Person {email: $email}) SET p.name = $name, p.email = $mail, p.status = $status, p.pictureUrl = $pictureUrl RETURN p";
        var result = session.run(query, parameters("email", email, "name", person.getName(), "mail", person.getEmail(), "status", person.getStatus(), "pictureUrl", person.getPictureUrl()));
        if (!result.hasNext()){
            throw new PersonNotFoundException(email);
        }

        return personMapper.mapTo(result);
    }
    public void patchPerson(String email, Person person) {
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH(p:Person {email: $email}) SET p.name = $name, p.email = $mail, p.status = $status RETURN p";
        var result = session.run(query, parameters("email", email, "name", person.getName(), "mail", person.getEmail(), "status", person.getStatus()));
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
