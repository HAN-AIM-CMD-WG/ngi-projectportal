package nl.han.ngi.projectportalbackend.core.exceptions;

import nl.han.ngi.projectportalbackend.core.models.UnverifiedPerson;

public class UnverifiedPersonCouldNotBeCreatedException extends RuntimeException {
    public UnverifiedPersonCouldNotBeCreatedException(UnverifiedPerson unverifiedPerson){
        super("Person with email: " + unverifiedPerson.getEmail() + " already exists");
    }
}
