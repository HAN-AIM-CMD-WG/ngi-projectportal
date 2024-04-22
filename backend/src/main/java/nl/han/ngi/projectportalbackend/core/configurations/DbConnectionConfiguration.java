package nl.han.ngi.projectportalbackend.core.configurations;

import org.neo4j.driver.AuthTokens;
import org.neo4j.driver.Driver;
import org.neo4j.driver.GraphDatabase;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DbConnectionConfiguration {

    @Value("${db.uri}")
    private String uri;

    @Value("${db.username}")
    private String user;

    @Value("${db.password}")
    private String password;

    public DbConnectionConfiguration(){

    }

    public Driver getDriver(){
        return GraphDatabase.driver(uri, AuthTokens.basic(user, password));
    }
}
