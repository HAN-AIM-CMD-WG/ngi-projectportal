package nl.han.ngi.projectportalbackend.api.controllers;

import nl.han.ngi.projectportalbackend.core.models.Company;
import nl.han.ngi.projectportalbackend.core.services.CompanyService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/company")
public class Companycontroller {

    CompanyService companyService;

    public Companycontroller(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping
    public Company getAll(){
        return companyService.getAll();
    }
}
