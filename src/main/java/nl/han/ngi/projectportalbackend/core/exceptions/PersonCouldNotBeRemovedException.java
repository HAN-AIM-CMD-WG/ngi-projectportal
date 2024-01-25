package nl.han.ngi.projectportalbackend.core.exceptions;

public class PersonCouldNotBeRemovedException extends RuntimeException {
    public PersonCouldNotBeRemovedException(String title, String email) {
        super("Person with email: " + email + " could not be removed from project with title: " + title);
    }
}
