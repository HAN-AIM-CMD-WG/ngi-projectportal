package nl.han.ngi.projectportalbackend.core.exceptions;

public class PersonIsAGuestException  extends RuntimeException {
    public PersonIsAGuestException(String email){
        super("Person with email: " + email + " is a guest and could therefore not be added to a project");
    }
}
