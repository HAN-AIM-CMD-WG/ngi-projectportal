package nl.han.ngi.projectportalbackend.api.controllers;

import nl.han.ngi.projectportalbackend.core.models.Company;
import nl.han.ngi.projectportalbackend.core.services.CompanyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/api/company")
public class Companycontroller {

    CompanyService companyService;

    public Companycontroller(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping
    public ResponseEntity getAll(){
        return new ResponseEntity(companyService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{uuid}")
    public ResponseEntity get(@PathVariable String uuid){
        return new ResponseEntity(companyService.get(uuid), HttpStatus.OK);
    }

    @GetMapping("/{uuid}/projects")
    public ResponseEntity getProjectsAssociatedToCompany(@PathVariable String uuid){
        return new ResponseEntity(companyService.getProjectsAssociatedToCompany(uuid),HttpStatus.OK);
    }

    @GetMapping("/{uuid}/members")
    public ResponseEntity getMembersAssociatedToCompany(@PathVariable String uuid){
        return new ResponseEntity(companyService.getMembersAssociatedToCompany(uuid), HttpStatus.OK);
    }
}
