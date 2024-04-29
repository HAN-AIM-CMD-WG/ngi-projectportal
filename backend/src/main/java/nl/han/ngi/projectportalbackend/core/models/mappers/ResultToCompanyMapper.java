package nl.han.ngi.projectportalbackend.core.models.mappers;

import nl.han.ngi.projectportalbackend.core.models.Company;
import org.neo4j.driver.Result;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ResultToCompanyMapper implements IMapper<Result, Company> {
    @Override
    public Company mapTo(Result from) {
        Company company = new Company();
        var res = from.next();
        var node = res.get("p").asNode();
        company.setName(node.get("name").asString());
        return company;
    }

    @Override
    public Company mapTo(List<Result> from) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public Result mapFrom(Company to) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public Result mapFrom(List<Company> to) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public List<Company> mapToList(Result from) {
        List<Company> companyList = new ArrayList<>();
        while(from.hasNext()) {
            companyList.add(mapTo(from));
        }
        return companyList;
    }

    @Override
    public List<Company> mapToList(List<Result> from) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public List<Result> mapFromList(Company to) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public List<Result> mapFromList(List<Company> to) {
        // TODO: implement me
        throw new UnsupportedOperationException("Not yet implemented");
    }
}
