package nl.han.ngi.projectportalbackend.core.services;

import nl.han.ngi.projectportalbackend.core.models.Person;
import nl.han.ngi.projectportalbackend.core.models.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PersonService {
    @Autowired
    private PersonRepository personRepository;

    public List<Person> getAll() {
        return personRepository.getAll();
    }
    public Person getPerson(String email){
        return personRepository.getPerson(email);
    }

    public Person createPerson(Person person) {
        return personRepository.createPerson(person);
    }

    public Person updatePerson(String email, Person person) {
        return personRepository.updatePerson(email, person);
    }

    public void deletePerson(String email) {
        personRepository.deletePerson(email);
    }
}
