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

    public VerificationResponse verifyPerson(String uuid) {
        return personRepository.verifyPerson(uuid);
    }

    public List<Person> getAll() {
        return personRepository.getAll();
    }

    public Person getPerson(String uuid){
        return personRepository.getPerson(uuid);
    }

    public Person getPersonByEmail(String email){
        return personRepository.getPersonByEmail(email);
    }

    public boolean doesPersonExistByEmail(String email) {
        return personRepository.doesPersonExistByEmail(email);
    }

    public boolean doesPersonExist(String uuid){
        return personRepository.doesPersonExists(uuid);
    }

    public Person createPerson(Person person) {
        String encodedPassword = passwordEncoder.encode(person.getPassword());
        person.setPassword(encodedPassword);
        return personRepository.createPerson(person);
    }

    public Person updatePerson(String uuid, Person person) {
        return personRepository.updatePerson(uuid, person);
    }

    public void deletePerson(String uuid) {
        personRepository.deletePerson(uuid);
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

    public Person patchPerson(String uuid, Map<Object, Object> fields) {
        Person person = personRepository.getPerson(uuid);
            fields.forEach((key, value) -> {
                Field field = ReflectionUtils.findField(Person.class, (String) key);
                field.setAccessible(true);
                ReflectionUtils.setField(field, person, value);
        });
            personRepository.patchPerson(uuid, person);
        return person;
    }

    public void createUnverifiedPerson(String email, String name, String pictureUrl) {
        if (!doesPersonExistByEmail(email)) {
            Guest unverifiedPerson = new Guest();
            unverifiedPerson.setEmail(email);
            unverifiedPerson.setName(name);
            unverifiedPerson.setStatus(Collections.emptyList());
            unverifiedPerson.setPictureUrl(pictureUrl);
            createGuest(unverifiedPerson);
        }
    }

    public void createOrUpdatePerson(String email, String name, String pictureUrl) {
        System.out.println(doesPersonExistByEmail(email));
        if (!doesPersonExistByEmail(email)) {
            System.out.println("Creating unverified person");
            createUnverifiedPerson(email, name, pictureUrl);
        } else {
            System.out.println("Updating person");
            Person person = getPersonByEmail(email);
            person.setEmail(email);
            person.setName(name);
            person.setPictureUrl(pictureUrl);
            updatePerson(person.getUuid(), person);
        }
    }

    public List<GrantedAuthority> fetchUserAuthorities(String email) {
        if (doesPersonExistByEmail(email)) {
            return getPersonByEmail(email).getStatus().stream()
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());
        } else {
            return Collections.singletonList(new SimpleGrantedAuthority("GUEST"));
        }
    }
}
