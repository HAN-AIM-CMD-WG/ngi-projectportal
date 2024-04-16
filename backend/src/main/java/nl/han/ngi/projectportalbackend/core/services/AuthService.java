package nl.han.ngi.projectportalbackend.core.services;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {
    void authenticateUser(String provider, String token, HttpServletRequest request, HttpServletResponse response);
}