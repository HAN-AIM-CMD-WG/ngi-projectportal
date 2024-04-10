package nl.han.ngi.projectportalbackend.core.services;

import nl.han.ngi.projectportalbackend.core.exceptions.EmptyParameterException;
import nl.han.ngi.projectportalbackend.core.models.Person;
import nl.han.ngi.projectportalbackend.core.models.PersonRepository;
import nl.han.ngi.projectportalbackend.core.models.Guest;
import nl.han.ngi.projectportalbackend.responses.VerificationResponse;
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

    public VerificationResponse verifyPerson(String email) {
        return personRepository.verifyPerson(email);
    }

    public List<Person> getAll() {
        return personRepository.getAll();
    }

    public Person getPerson(String email){
        return personRepository.getPerson(email);
    }

    public boolean doesPersonExist(String email) {
        return personRepository.doesPersonExist(email);
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

    public void createOrUpdatePerson(String email, String name, String pictureUrl) {
        if (!doesPersonExist(email)) {
            System.out.println("Creating unverified person");
            createUnverifiedPerson(email, name, pictureUrl);
        } else {
            System.out.println("Updating person");
            Person person = getPerson(email);
            person.setName(name);
            person.setPictureUrl(pictureUrl);
            updatePerson(email, person);
        }
    }

    public List<GrantedAuthority> fetchUserAuthorities(String email) {
        if (doesPersonExist(email)) {
            return getPerson(email).getStatus().stream()
                    .map(status -> new SimpleGrantedAuthority("ROLE_" + status))
                    .collect(Collectors.toList());
        } else {
            return Collections.singletonList(new SimpleGrantedAuthority("ROLE_GUEST"));
        }
    }
}
