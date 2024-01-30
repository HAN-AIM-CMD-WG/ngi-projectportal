package nl.han.ngi.projectportalbackend.core.exceptions;

public class EmptyParameterException extends RuntimeException {
    public EmptyParameterException(){
        super("One or more parameters are empty");
    }
}
