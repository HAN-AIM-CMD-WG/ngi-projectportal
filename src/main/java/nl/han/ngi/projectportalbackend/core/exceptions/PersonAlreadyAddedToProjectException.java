package nl.han.ngi.projectportalbackend.core.exceptions;

public class PersonAlreadyAddedToProjectException extends RuntimeException {
    public PersonAlreadyAddedToProjectException(String title, String email) {
        super("Person with email: " + email + " already has an active participation at project with title: " + title);
    }
}
