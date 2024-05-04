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

    @GetMapping("/verify/{id}")
    public ResponseEntity verifyPerson(@PathVariable String id){
        try {
            return new ResponseEntity(personService.verifyPerson(id), HttpStatus.OK);
        }catch(PersonNotFoundException exc){
            return new ResponseEntity(exc, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity getPerson(@PathVariable String id){
            return new ResponseEntity(personService.getPerson(id), HttpStatus.OK);
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

    @PutMapping("/{id}")
    public ResponseEntity updatePerson(@PathVariable String id, @RequestBody Person person){
        try{
            return new ResponseEntity(personService.updatePerson(id, person), HttpStatus.OK);
        } catch(Exception exc){
            return new ResponseEntity(exc.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

    @PatchMapping("/{id}")
    public ResponseEntity patchPerson(@PathVariable String id, @RequestBody Map<Object, Object> fields){
        try{
            return new ResponseEntity(personService.patchPerson(id, fields), HttpStatus.OK);
        } catch(Exception exc){
            return new ResponseEntity(exc.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity deletePerson(@PathVariable String id){
        try{
            personService.deletePerson(id);
            return new ResponseEntity("Person with id: " + id + " has been successfully deleted", HttpStatus.OK);
        } catch(Exception exc){
            return new ResponseEntity(exc.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
