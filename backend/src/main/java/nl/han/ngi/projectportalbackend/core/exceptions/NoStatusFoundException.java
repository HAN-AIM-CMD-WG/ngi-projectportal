package nl.han.ngi.projectportalbackend.core.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class NoStatusFoundException extends RuntimeException {
    public NoStatusFoundException(){
        super("No status has been found in the database");
    }
}
