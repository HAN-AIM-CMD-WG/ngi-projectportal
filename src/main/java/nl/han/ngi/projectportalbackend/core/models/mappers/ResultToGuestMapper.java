package nl.han.ngi.projectportalbackend.core.models.mappers;

import nl.han.ngi.projectportalbackend.core.models.Guest;
import org.neo4j.driver.Result;
import org.neo4j.driver.Value;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
@Component
public class ResultToGuestMapper implements IMapper<Result, Guest> {
    @Override
    public Guest mapTo(Result from) {
        Guest guest = new Guest();
        var res = from.next();
        var node = res.get("p").asNode();
        guest.setName(node.get("name").asString());
        guest.setEmail(node.get("email").asString());
        guest.setStatus(node.get("status").asList(Value::asString));

        return guest;
    }

    @Override
    public Guest mapTo(List<Result> from) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public Result mapFrom(Guest to) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public Result mapFrom(List<Guest> to) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public List<Guest> mapToList(Result from) {
        List<Guest> guestList = new ArrayList<>();
        while(from.hasNext()){
            guestList.add(mapTo(from));
        }
        return guestList;
    }

    @Override
    public List<Guest> mapToList(List<Result> from) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public List<Result> mapFromList(Guest to) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public List<Result> mapFromList(List<Guest> to) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }
}

