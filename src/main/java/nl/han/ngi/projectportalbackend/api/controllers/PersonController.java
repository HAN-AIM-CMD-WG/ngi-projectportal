package nl.han.ngi.projectportalbackend.api.controllers;

import nl.han.ngi.projectportalbackend.core.exceptions.EmptyParameterException;
import nl.han.ngi.projectportalbackend.core.exceptions.PersonNotFoundException;
import nl.han.ngi.projectportalbackend.core.models.Person;
import nl.han.ngi.projectportalbackend.core.models.Guest;
import nl.han.ngi.projectportalbackend.core.services.PersonService;
import org.neo4j.driver.exceptions.ClientException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import java.util.Map;

@RestController
@RequestMapping("/api/person")
public class PersonController {
    private final PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping()
    public ResponseEntity getAll() {
        try {
            List<Person> allPersons = personService.getAll();
            return new ResponseEntity(allPersons, HttpStatus.OK);
        } catch(Exception exc) {
            return new ResponseEntity(exc.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/deelnemers")
    public ResponseEntity getDeelnemers(){
        try {
            return new ResponseEntity(personService.getDeelnemers(), HttpStatus.OK);
        } catch(Exception exc){
            return new ResponseEntity(exc.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/verify/{email}")
    public ResponseEntity verifyPerson(@PathVariable String email){
        try {
            return new ResponseEntity(personService.verifyPerson(email), HttpStatus.OK);
        }catch(PersonNotFoundException exc){
            return new ResponseEntity(exc, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{email}")
    public ResponseEntity getPerson(@PathVariable String email){
            return new ResponseEntity(personService.getPerson(email), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity createPerson(@RequestBody Person person){
        try {
            return new ResponseEntity(personService.createPerson(person), HttpStatus.OK);
        } catch(Exception exc) {
            return new ResponseEntity(exc.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/createGuest")
    public ResponseEntity createGuest(@RequestBody Guest guest){
            return new ResponseEntity(personService.createGuest(guest), HttpStatus.OK);
    }

    @PutMapping("/{email}")
    public ResponseEntity updatePerson(@PathVariable String email, @RequestBody Person person){
        try{
            return new ResponseEntity(personService.updatePerson(email, person), HttpStatus.OK);
        } catch(Exception exc){
            return new ResponseEntity(exc.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

    @PatchMapping("/{email}")
    public ResponseEntity patchPerson(@PathVariable String email, @RequestBody Map<Object, Object> fields){
        try{
            return new ResponseEntity(personService.patchPerson(email, fields), HttpStatus.OK);
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
