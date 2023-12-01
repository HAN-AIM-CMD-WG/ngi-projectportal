package nl.han.ngi.projectportalbackend.api.controllers;

import nl.han.ngi.projectportalbackend.core.models.Person;
import nl.han.ngi.projectportalbackend.core.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
public class PersonController {
    @Autowired
    private PersonService personService;

    @GetMapping("/{name}")
    public Person getPerson(@PathVariable String name){
        return personService.getPerson(name);
    }

    @PostMapping("/{name}")
    public Person createPerson(@RequestBody Person person){
        return personService.createPerson(person);
    }
}
