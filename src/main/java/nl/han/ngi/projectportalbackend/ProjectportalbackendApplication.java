package nl.han.ngi.projectportalbackend;

import nl.han.ngi.projectportalbackend.core.models.Person;
import nl.han.ngi.projectportalbackend.core.models.PersonRepository;
import org.neo4j.cypherdsl.core.renderer.Configuration;
import org.neo4j.cypherdsl.core.renderer.Dialect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.neo4j.repository.config.EnableNeo4jRepositories;

import java.util.Arrays;

@SpringBootApplication
@EnableNeo4jRepositories
public class ProjectportalbackendApplication {

	private final static Logger log = LoggerFactory.getLogger(ProjectportalbackendApplication.class);
	public static void main(String[] args) throws Exception{
		SpringApplication.run(ProjectportalbackendApplication.class, args);
//		System.exit(0);
	}
	@Bean
	public Configuration cypherDslConfiguration() {
		return Configuration.newConfig().withDialect(Dialect.NEO4J_5).build();
	}

//	@Bean
//	CommandLineRunner demo(PersonRepository personRepository) {
//		return args -> {
//			personRepository.deleteAll();
//
//			Person jesse = new Person("Jesse", "jesseveldmaat@hotmail.nl", Arrays.asList("OPDRACHTGEVER"));
//
//			log.info("Testing to see if person is added to db");
//			personRepository.save(jesse);

//			log.info("Lookup person by name...");
//
//			Person gotFromDB = personRepository.findByName("jesse");
//
//			log.info("Person found is: " + gotFromDB.getName() + " with e-mailadres: " + gotFromDB.getEmail());
//		};
//	}

}
