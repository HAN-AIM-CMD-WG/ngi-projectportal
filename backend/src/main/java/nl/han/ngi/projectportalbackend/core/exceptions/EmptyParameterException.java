package nl.han.ngi.projectportalbackend.core.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class EmptyParameterException extends RuntimeException {
    public EmptyParameterException(){
        super("One or more parameters are empty");
    }
}
