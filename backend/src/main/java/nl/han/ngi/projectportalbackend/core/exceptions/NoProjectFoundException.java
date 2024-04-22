package nl.han.ngi.projectportalbackend.core.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class NoProjectFoundException extends RuntimeException {
    public NoProjectFoundException(){
        super("No project has been found in the database");
    }
}
