package nl.han.ngi.projectportalbackend.core.services.strategies;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;

public interface AuthenticationStrategy {
    boolean supports(String provider);
    Authentication authenticate(String token, HttpServletRequest request);
}
