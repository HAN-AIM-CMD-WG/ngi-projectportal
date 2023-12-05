package nl.han.ngi.projectportalbackend.core.services;

import nl.han.ngi.projectportalbackend.core.models.Person;
import nl.han.ngi.projectportalbackend.core.models.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PersonService {
    @Autowired
    private PersonRepository personRepository;
    public Person getPerson(String name){
        return personRepository.getPerson(name);
    }

    public Person createPerson(Person person) {
        return personRepository.createPerson(person);
    }

    public Person updatePerson(int id, Person person) {
        return personRepository.updatePerson(id, person);
    }

    public void deletePerson(int id) {
        personRepository.deletePerson(id);
    }
}
