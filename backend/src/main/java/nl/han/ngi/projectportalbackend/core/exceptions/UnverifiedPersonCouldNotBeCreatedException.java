package nl.han.ngi.projectportalbackend.core.exceptions;

import nl.han.ngi.projectportalbackend.core.models.Guest;

public class UnverifiedPersonCouldNotBeCreatedException extends RuntimeException {
    public UnverifiedPersonCouldNotBeCreatedException(Guest unverifiedPerson){
        super("Person with email: " + unverifiedPerson.getEmail() + " already exists");
    }
}
