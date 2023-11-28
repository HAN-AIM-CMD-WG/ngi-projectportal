package nl.han.ngi.projectportalbackend.core.models;

import org.neo4j.driver.AuthTokens;
import org.neo4j.driver.Driver;
import org.neo4j.driver.GraphDatabase;
import org.neo4j.driver.Query;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Arrays;

import static org.neo4j.driver.Values.parameters;

@Component
public class PersonRepository {
    private Driver driver;

    @Value("${db.uri}")
    private String uri;

    @Value("${db.username}")
    private String user;

    @Value("${db.password}")
    private String password;

    public PersonRepository(){
    }

    public Driver getDriver(){
        System.out.println("uri = " + uri);
        return GraphDatabase.driver(uri, AuthTokens.basic(user, password));
    }

    public Person getPerson(int id){
        driver = getDriver();
        try(var session = driver.session()){
            var result = session.run("MATCH (p:Person {name: 'Jesse'}) return p");
            while (result.hasNext()){
                System.out.println(result.next().fields().get(0).value());
            }


        }
        return new Person("Jesse", "jesseveldmaat@hotmail.nl", Arrays.asList("OPDRACHTGEVER"));
    }
}
