package nl.han.ngi.projectportalbackend.core.exceptions;

public class ProjectCouldNotBeDeletedException extends RuntimeException  {
    public ProjectCouldNotBeDeletedException(String title) {
        super("Project with title: " + title + " could not be deleted");
    }
}
