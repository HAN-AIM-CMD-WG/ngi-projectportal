package nl.han.ngi.projectportalbackend.core.models;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface ProjectRepository extends Neo4jRepository<Project, Long> {

    Project findByTitle(String title);
}
