package nl.han.ngi.projectportalbackend.core.services;

import nl.han.ngi.projectportalbackend.core.models.Person;
import nl.han.ngi.projectportalbackend.core.models.PersonRepository;
import nl.han.ngi.projectportalbackend.core.models.UnverifiedPerson;
import org.springframework.util.ReflectionUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PersonService {
    private final PersonRepository personRepository;
    private final PasswordEncoder passwordEncoder;

    public PersonService(PersonRepository personRepository, PasswordEncoder passwordEncoder) {
        this.personRepository = personRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Person> getAll() {
        return personRepository.getAll();
    }

    public Person getPerson(String email){
        return personRepository.getPerson(email);
    }

    public Person createPerson(Person person) {
        String encodedPassword = passwordEncoder.encode(person.getPassword());
        person.setPassword(encodedPassword);
        return personRepository.createPerson(person);
    }

    public Person updatePerson(String email, Person person) {
        return personRepository.updatePerson(email, person);
    }

    public void deletePerson(String email) {
        personRepository.deletePerson(email);
    }

    public UnverifiedPerson createUnverifiedPerson(UnverifiedPerson unverifiedPerson) {
        return personRepository.createUnverifiedPerson(unverifiedPerson);
    }

    public Person patchPerson(String email, Map<Object, Object> fields) {
        Person person = personRepository.getPerson(email);
            fields.forEach((key, value) -> {
                Field field = ReflectionUtils.findField(Person.class, (String) key);
                field.setAccessible(true);
                ReflectionUtils.setField(field, person, value);
        });
            System.out.println(person.getStatus());
            personRepository.patchPerson(email, person);
        return person;
    }
}
