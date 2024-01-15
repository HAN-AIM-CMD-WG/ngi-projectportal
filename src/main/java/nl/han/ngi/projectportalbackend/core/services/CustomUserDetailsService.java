package nl.han.ngi.projectportalbackend.core.services;

import nl.han.ngi.projectportalbackend.core.models.Person;
import nl.han.ngi.projectportalbackend.core.models.PersonRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final Logger logger = LoggerFactory.getLogger(CustomUserDetailsService.class);
    private final PersonRepository personRepository;

    public CustomUserDetailsService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) {
        Person person = personRepository.getPerson(email);

        if (person == null) {
            logger.warn("User with email '{}' not found.", email);
            throw new UsernameNotFoundException(email);
        }

        String rolesString = String.join(",", person.getStatus());

        //log roles
        logger.info("User with email '{}' has roles '{}'.", email, rolesString);

        return User
                .withUsername(person.getEmail())
                .password(person.getPassword())
                .roles(rolesString)
                .build();
    }
}