package nl.han.ngi.projectportalbackend.core.services;

import nl.han.ngi.projectportalbackend.core.repositories.CompanyRepository;
import org.springframework.stereotype.Service;

@Service
public class CompanyService {

    CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository) {this.companyRepository = companyRepository;}
}
