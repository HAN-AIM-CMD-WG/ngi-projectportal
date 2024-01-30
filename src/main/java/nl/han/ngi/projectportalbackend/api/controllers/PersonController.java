package nl.han.ngi.projectportalbackend.api.controllers;

import nl.han.ngi.projectportalbackend.core.exceptions.EmptyParameterException;
import nl.han.ngi.projectportalbackend.core.exceptions.PersonNotFoundException;
import nl.han.ngi.projectportalbackend.core.models.Person;
import nl.han.ngi.projectportalbackend.core.models.UnverifiedPerson;
import nl.han.ngi.projectportalbackend.core.services.PersonService;
import org.neo4j.driver.exceptions.ClientException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/person")
public class PersonController {
    @Autowired
    private PersonService personService;

    @GetMapping()
    public ResponseEntity getAll(){
        try {
            return new ResponseEntity(personService.getAll(), HttpStatus.OK);
        } catch(Exception exc){
            return new ResponseEntity(exc.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{email}")
    public ResponseEntity getPerson(@PathVariable String email){
        try {
            return new ResponseEntity(personService.getPerson(email), HttpStatus.OK);
        }catch(PersonNotFoundException exc){
            return new ResponseEntity(exc, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/create")
    public ResponseEntity createPerson(@RequestBody Person person){
        try {
            return new ResponseEntity(personService.createPerson(person), HttpStatus.OK);
        } catch(Exception exc) {
            System.out.println(exc);
            return new ResponseEntity(exc.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/createUnverified")
    public ResponseEntity createUnverifiedPerson(@RequestBody UnverifiedPerson unverifiedPerson){
        try {
            if(unverifiedPerson.getEmail().isEmpty() || unverifiedPerson.getName().isEmpty()){
                throw new EmptyParameterException();
            }
            return new ResponseEntity(personService.createUnverifiedPerson(unverifiedPerson), HttpStatus.OK);
        } catch(ClientException exc){
            return new ResponseEntity("person with email: " + unverifiedPerson.getEmail() + " already exists in the database", HttpStatus.BAD_REQUEST);
        } catch (Exception exc){
            return new ResponseEntity(exc.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{email}")
    public ResponseEntity updatePerson(@PathVariable String email, @RequestBody Person person){
        try{
            return new ResponseEntity(personService.updatePerson(email, person), HttpStatus.OK);
        } catch(Exception exc){
            return new ResponseEntity(exc.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

    @DeleteMapping("{email}")
    public ResponseEntity deletePerson(@PathVariable String email){
        try{
            personService.deletePerson(email);
            return new ResponseEntity("Person with email: " + email + " has been successfully deleted", HttpStatus.OK);
        } catch(Exception exc){
            return new ResponseEntity(exc.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
