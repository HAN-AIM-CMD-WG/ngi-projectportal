package nl.han.ngi.projectportalbackend.core.services;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import nl.han.ngi.projectportalbackend.core.services.strategies.AuthenticationStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;

@Service
public class AuthServiceImpl implements AuthService {

    private final List<AuthenticationStrategy> strategies;

    @Autowired
    public AuthServiceImpl(List<AuthenticationStrategy> strategies) {
        this.strategies = strategies;
    }

    @Override
    public void authenticateUser(String provider, String token, HttpServletRequest request, HttpServletResponse response) {
        for (AuthenticationStrategy strategy : strategies) {
            if (strategy.supports(provider)) {
                try {
                    Authentication authentication = strategy.authenticate(token, request);
                    SecurityContextHolder.getContext().setAuthentication(authentication);

                    HttpSession session = request.getSession(true);
                    session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

                    String roles = authentication.getAuthorities().stream()
                            .map(GrantedAuthority::getAuthority)
                            .collect(Collectors.joining(","));

                    response.setContentType("application/json");
                    response.setStatus(HttpStatus.OK.value());
                    response.getWriter().write(
                            String.format(
                                    "{\"message\":\"Successfully authenticated.\", \"email\":\"%s\", \"roles\":\"%s\"}",
                                    authentication.getName(), roles
                            )
                    );
                    return;
                } catch (Exception e) {
                    System.out.println("An error occurred during the authentication process.");
                    try {
                        response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "{\"error\":\"An error occurred during the authentication process.\"}");
                    } catch (IOException ioException) {
                        System.out.println("An error occurred while writing the response");
                    }
                    return;
                }
            }
        }

        try {
            response.setStatus(HttpStatus.BAD_REQUEST.value());
            response.getWriter().write("{\"error\":\"Unsupported authentication provider\"}");
        } catch (IOException ignored) {
            System.out.println("An error occurred while writing the response");
        }
    }
}