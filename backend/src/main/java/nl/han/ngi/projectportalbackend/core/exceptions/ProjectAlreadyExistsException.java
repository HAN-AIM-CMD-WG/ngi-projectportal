package nl.han.ngi.projectportalbackend.core.exceptions;



public class ProjectAlreadyExistsException extends RuntimeException{

    public ProjectAlreadyExistsException(String title){
        super("project with title: " + title + " already exists");
    }
}
