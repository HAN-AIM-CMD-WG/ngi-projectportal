package nl.han.ngi.projectportalbackend.core.models;

import nl.han.ngi.projectportalbackend.core.models.Person;
import org.springframework.data.neo4j.repository.Neo4jRepository;

import java.util.List;

public interface PersonRepository extends Neo4jRepository<Person, Long> {

    Person findByName(String name);
}
