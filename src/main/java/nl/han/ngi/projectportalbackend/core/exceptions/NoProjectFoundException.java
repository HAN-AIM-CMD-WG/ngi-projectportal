package nl.han.ngi.projectportalbackend.core.exceptions;

public class NoProjectFoundException extends RuntimeException {
    public NoProjectFoundException(){
        super("No project has been found in the database");
    }
}
