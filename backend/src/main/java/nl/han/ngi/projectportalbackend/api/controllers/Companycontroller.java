package nl.han.ngi.projectportalbackend.api.controllers;

import net.minidev.json.JSONObject;
import nl.han.ngi.projectportalbackend.core.models.Company;
import nl.han.ngi.projectportalbackend.core.services.CompanyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
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

    @PostMapping("/{uuid}/applicant/{userUuid}/accept")
    public ResponseEntity acceptApplicantStatusToCompany(@PathVariable String uuid, @PathVariable String userUuid, @RequestBody String role){
        companyService.acceptApplicantStatusToCompany(uuid,userUuid, role);
        return new ResponseEntity("Succesfully added user to company with role: " + role + " to applicant: " + userUuid,HttpStatus.OK);
    }

    @PostMapping("/{uuid}/applicant/{userUuid}/deny")
    public ResponseEntity rejectApplicantStatusToCompany(@PathVariable String uuid, @PathVariable String userUuid, @RequestBody Map<Object,String> qparams) {
        companyService.rejectApplicantStatusToCompany(uuid,userUuid, qparams.get("reason"), qparams.get("email"));
        return new ResponseEntity("Succesfully rejected user with: " + userUuid,HttpStatus.OK);
    }
}
