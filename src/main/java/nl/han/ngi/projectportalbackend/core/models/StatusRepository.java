package nl.han.ngi.projectportalbackend.core.models;

import nl.han.ngi.projectportalbackend.core.configurations.DbConnectionConfiguration;
import nl.han.ngi.projectportalbackend.core.exceptions.NoStatusFoundException;
import nl.han.ngi.projectportalbackend.core.models.mappers.IMapper;
import org.neo4j.driver.Driver;
import org.neo4j.driver.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class StatusRepository {
    private Driver driver;

    @Autowired
    private IMapper<Result, Status> mapper;

    @Autowired
    private DbConnectionConfiguration db;

    public StatusRepository(){

    }

    public List<Status> getAll() {
        driver = db.getDriver();
        var session = driver.session();
        var query = "MATCH(s:Status) RETURN s";
        var result = session.run(query);
        if(!result.hasNext()){
            throw new NoStatusFoundException();
        }
        return mapper.mapToList(result);
    }
}
