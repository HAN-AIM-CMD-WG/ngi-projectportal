package nl.han.ngi.projectportalbackend.api.controllers;

import nl.han.ngi.projectportalbackend.core.models.Person;
import nl.han.ngi.projectportalbackend.core.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/person")
public class PersonController {
    @Autowired
    private PersonService personService;

    @GetMapping()
    public List<Person> getll(){
        return personService.getAll();
    }

    @GetMapping("/{email}")
    public Person getPerson(@PathVariable String email){
        return personService.getPerson(email);
    }

    @PostMapping("/create")
    public Person createPerson(@RequestBody Person person){
        return personService.createPerson(person);
    }

    @PutMapping("/{email}")
    public Person updatePerson(@PathVariable String email, @RequestBody Person person){
        return personService.updatePerson(email, person);
    }

    @DeleteMapping("{email}")
    public ResponseEntity<Integer> deletePerson(@PathVariable String email){
        personService.deletePerson(email);
        return ResponseEntity.ok().build();
    }
}
