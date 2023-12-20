package nl.han.ngi.projectportalbackend.core.exceptions;

public class NoPersonFoundException extends RuntimeException{

    public NoPersonFoundException(){
        super("No person has been found in the database");
    }
}
