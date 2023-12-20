package nl.han.ngi.projectportalbackend.core.exceptions;

public class PersonCouldNotBeDeletedException extends RuntimeException {
    public PersonCouldNotBeDeletedException(String email) {
        super("Project with email: " + email + " could not be deleted");
    }
}
