package nl.han.ngi.projectportalbackend.api.controllers;

import nl.han.ngi.projectportalbackend.core.services.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/status")
public class StatusController {
    @Autowired
    private StatusService statusService;

    @GetMapping()
    public ResponseEntity getAll(){
        try{
            return new ResponseEntity(statusService.getAll(), HttpStatus.OK);
        }
    }
}
