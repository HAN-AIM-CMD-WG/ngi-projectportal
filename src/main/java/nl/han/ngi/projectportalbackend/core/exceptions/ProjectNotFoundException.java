package nl.han.ngi.projectportalbackend.core.exceptions;

public class ProjectNotFoundException extends RuntimeException {
    public ProjectNotFoundException(String title){
        super("Project with title: " + title + " not found");
    }
}