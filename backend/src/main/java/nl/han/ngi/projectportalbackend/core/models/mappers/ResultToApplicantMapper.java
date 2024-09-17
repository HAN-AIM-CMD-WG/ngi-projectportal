package nl.han.ngi.projectportalbackend.core.models.mappers;

import nl.han.ngi.projectportalbackend.core.models.Applicant;
import org.neo4j.driver.Result;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
@Component
public class ResultToApplicantMapper implements IMapper<Result, Applicant>{
    @Override
    public Applicant mapTo(Result from) {
        Applicant applicant = new Applicant();
        var res = from.next();
        var node = res.get("p").asNode();
        applicant.setUuid(node.get("uuid").asString());
        applicant.setName(node.get("name").asString());
        applicant.setEmail(node.get("email").asString());
        applicant.setStatus("PENDING");

        return applicant;
    }

    @Override
    public Applicant mapTo(List<Result> from) {
        return null;
    }

    @Override
    public Result mapFrom(Applicant to) {
        return null;
    }

    @Override
    public Result mapFrom(List<Applicant> to) {
        return null;
    }

    @Override
    public List<Applicant> mapToList(Result from) {
        List<Applicant> applicantList = new ArrayList<>();
        while(from.hasNext()){
            applicantList.add(mapTo(from));
        }
        return applicantList;
    }

    @Override
    public List<Applicant> mapToList(List<Result> from) {
        return null;
    }

    @Override
    public List<Result> mapFromList(Applicant to) {
        return null;
    }

    @Override
    public List<Result> mapFromList(List<Applicant> to) {
        return null;
    }
}
