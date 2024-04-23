package nl.han.ngi.projectportalbackend.core.repositories;

import nl.han.ngi.projectportalbackend.core.configurations.DbConnectionConfiguration;
import nl.han.ngi.projectportalbackend.core.exceptions.NoStatusFoundException;
import nl.han.ngi.projectportalbackend.core.models.Status;
import nl.han.ngi.projectportalbackend.core.models.mappers.IMapper;
import org.neo4j.driver.Driver;
import org.neo4j.driver.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StatusRepository {
    private Driver driver;

    private final IMapper<Result, Status> mapper;

    private final DbConnectionConfiguration db;

    public StatusRepository(IMapper<Result, Status> mapper, DbConnectionConfiguration db){
        this.mapper = mapper;
        this.db = db;
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
