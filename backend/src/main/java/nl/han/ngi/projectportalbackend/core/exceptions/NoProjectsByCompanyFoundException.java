package nl.han.ngi.projectportalbackend.core.exceptions;

public class NoProjectsByCompanyFoundException extends RuntimeException {
    public NoProjectsByCompanyFoundException(String uuid) {
        super("No projects found with company that has uuid of: " + uuid);
    }
}
