package nl.han.ngi.projectportalbackend.core.models;

import nl.han.ngi.projectportalbackend.core.configurations.DbConnectionConfiguration;
import org.neo4j.driver.Driver;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class StatusRepository {
    private Driver driver;

    @Autowired
    private DbConnectionConfiguration db;

    public StatusRepository(){

    }

    public List<Status> getAll() {

    }
}
