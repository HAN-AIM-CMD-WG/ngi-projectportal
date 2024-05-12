package nl.han.ngi.projectportalbackend;

import org.neo4j.cypherdsl.core.renderer.Configuration;
import org.neo4j.cypherdsl.core.renderer.Dialect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.neo4j.repository.config.EnableNeo4jRepositories;

@SpringBootApplication
@EnableNeo4jRepositories
public class ProjectportalbackendApplication {

	private final static Logger log = LoggerFactory.getLogger(ProjectportalbackendApplication.class);

	public static void main(String[] args) throws Exception {
		SpringApplication.run(ProjectportalbackendApplication.class, args);
	}

}
