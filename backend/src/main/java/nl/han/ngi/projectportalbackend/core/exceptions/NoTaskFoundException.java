package nl.han.ngi.projectportalbackend.core.exceptions;

public class NoTaskFoundException extends RuntimeException {
    public NoTaskFoundException(String id) {
        super("No task found with project id: " + id);
    }
}
