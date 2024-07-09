package nl.han.ngi.projectportalbackend.api.controllers;

import nl.han.ngi.projectportalbackend.core.models.Company;
import nl.han.ngi.projectportalbackend.core.services.CompanyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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

    @GetMapping("/{uuid}/applicants")
    public ResponseEntity getApplicantsAssociatedToCompany(@PathVariable String uuid){
        return new ResponseEntity(companyService.getApplicantsAssociatedToCompany(uuid), HttpStatus.OK);
    }

    @PostMapping("/{uuid}/applicant/{userUuid}")
    public ResponseEntity updateApplicantStatusToCompany(@PathVariable String uuid, @PathVariable String userUuid, @RequestBody String status){
        companyService.updateApplicantStatusToCompany(uuid,userUuid, status);
        return new ResponseEntity("Succesfully added status: " + status + " to applicant: " + userUuid,HttpStatus.OK);
    }
}
