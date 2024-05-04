package nl.han.ngi.projectportalbackend.core.services;

import nl.han.ngi.projectportalbackend.core.exceptions.EmptyParameterException;
import nl.han.ngi.projectportalbackend.core.models.Person;
import nl.han.ngi.projectportalbackend.core.repositories.PersonRepository;
import nl.han.ngi.projectportalbackend.core.models.Guest;
import nl.han.ngi.projectportalbackend.core.models.VerificationResponse;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.util.ReflectionUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PersonService {
    private final EmailService emailService;
    private final PersonRepository personRepository;
    private final PasswordEncoder passwordEncoder;

    public PersonService(PersonRepository personRepository, PasswordEncoder passwordEncoder, EmailService emailService) {
        this.personRepository = personRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    public List<Person> getDeelnemers() {
        return personRepository.getDeelnemers();
    }

    public VerificationResponse verifyPerson(String id) {
        return personRepository.verifyPerson(id);
    }

    public List<Person> getAll() {
        return personRepository.getAll();
    }

    public Person getPerson(String id){
        return personRepository.getPerson(id);
    }

    public boolean doesPersonExist(String id) {
        return personRepository.doesPersonExist(id);
    }

    public Person createPerson(Person person) {
        String encodedPassword = passwordEncoder.encode(person.getPassword());
        person.setPassword(encodedPassword);
        return personRepository.createPerson(person);
    }

    public Person updatePerson(String id, Person person) {
        return personRepository.updatePerson(id, person);
    }

    public void deletePerson(String id) {
        personRepository.deletePerson(id);
    }

    public Guest createGuest(Guest guest) {
        if(guest.getEmail().isEmpty() || guest.getName().isEmpty()){
            throw new EmptyParameterException();
        }
        Guest createdGuest = personRepository.createGuest(guest);

        String emailSubject = "Please verify your email address";
        String verificationLink = "http://localhost:5173/verify/" + createdGuest.getEmail();
        String emailContent = "Dear " + createdGuest.getName() + ",\n\nPlease click the following link to verify your email address: " + verificationLink + "\n\nThank you!";
        emailService.sendSimpleEmail(createdGuest.getEmail(), emailSubject, emailContent);

        return createdGuest;
    }

    public Person patchPerson(String id, Map<Object, Object> fields) {
        Person person = personRepository.getPerson(id);
            fields.forEach((key, value) -> {
                Field field = ReflectionUtils.findField(Person.class, (String) key);
                field.setAccessible(true);
                ReflectionUtils.setField(field, person, value);
        });
            personRepository.patchPerson(id, person);
        return person;
    }

    public void createUnverifiedPerson(String email, String name, String pictureUrl) {
        if (!doesPersonExist(email)) {
            Guest unverifiedPerson = new Guest();
            unverifiedPerson.setEmail(email);
            unverifiedPerson.setName(name);
            unverifiedPerson.setStatus(Collections.emptyList());
            unverifiedPerson.setPictureUrl(pictureUrl);
            createGuest(unverifiedPerson);
        }
    }

    public void createOrUpdatePerson(String id, String email, String name, String pictureUrl) {
        if (!doesPersonExist(id)) {
            System.out.println("Creating unverified person");
            createUnverifiedPerson(email, name, pictureUrl);
        } else {
            System.out.println("Updating person");
            Person person = getPerson(id);
            person.setEmail(email);
            person.setName(name);
            person.setPictureUrl(pictureUrl);
            updatePerson(id, person);
        }
    }

    public List<GrantedAuthority> fetchUserAuthorities(String id) {
        if (doesPersonExist(id)) {
            return getPerson(id).getStatus().stream()
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());
        } else {
            return Collections.singletonList(new SimpleGrantedAuthority("GUEST"));
        }
    }
}
