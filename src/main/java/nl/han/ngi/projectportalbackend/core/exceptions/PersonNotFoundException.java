package nl.han.ngi.projectportalbackend.core.exceptions;

public class PersonNotFoundException extends RuntimeException{

    public PersonNotFoundException(String email){
        super("Person with email: " + email + " not found");
    }
}
