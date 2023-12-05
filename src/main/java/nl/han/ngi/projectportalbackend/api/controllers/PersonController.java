package nl.han.ngi.projectportalbackend.api.controllers;

import nl.han.ngi.projectportalbackend.core.models.Person;
import nl.han.ngi.projectportalbackend.core.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@RequestMapping("/api/person")
public class PersonController {
    @Autowired
    private PersonService personService;

    @GetMapping("/{name}")
    public Person getPerson(@PathVariable String name){
        return personService.getPerson(name);
    }

    @PostMapping("/create")
    public Person createPerson(@RequestBody Person person){
        return personService.createPerson(person);
    }

    @PutMapping("/{id}")
    public Person updatePerson(@PathVariable int id, @RequestBody Person person){
        return personService.updatePerson(id, person);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Integer> deletePerson(@PathVariable int id){
        personService.deletePerson(id);
        return ResponseEntity.ok().build();
    }
}
