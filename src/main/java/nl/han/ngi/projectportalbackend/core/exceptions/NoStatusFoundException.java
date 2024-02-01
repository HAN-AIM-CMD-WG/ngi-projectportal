package nl.han.ngi.projectportalbackend.core.exceptions;

public class NoStatusFoundException extends RuntimeException {
    public NoStatusFoundException(){
        super("No status has been found in the database");
    }
}
