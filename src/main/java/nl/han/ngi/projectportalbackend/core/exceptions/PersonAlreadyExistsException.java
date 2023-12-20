package nl.han.ngi.projectportalbackend.core.exceptions;
public class PersonAlreadyExistsException extends RuntimeException{

    public PersonAlreadyExistsException(String email){
        super("Person with: " + email + " already exists");
    }
}
