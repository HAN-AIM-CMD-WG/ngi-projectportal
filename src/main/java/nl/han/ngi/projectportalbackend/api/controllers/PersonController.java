package nl.han.ngi.projectportalbackend.api.controllers;

import nl.han.ngi.projectportalbackend.core.models.Person;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;

@RestController
public class PersonController {

    @GetMapping("/{id}")
    public Person getPerson(@PathVariable int id){

        return new Person("Jesse", "jesseveldmaat@hotmail.nl", Arrays.asList("OPDRACHTGEVER"));
    }
}
