package nl.han.ngi.projectportalbackend.api.controllers;

import nl.han.ngi.projectportalbackend.core.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
public class GoogleLoginController {

    @Autowired
    private AuthService authService;

    @PostMapping("/google")
    public void loginWithGoogle(@RequestBody GoogleToken googleToken, HttpServletResponse response, HttpServletRequest request) {
        authService.authenticateUser("google", googleToken.getToken(), request, response);
    }

    // Later kunnen we andere login manieren toevoegen:
    // @PostMapping("/microsoft")
    // public void loginWithMicrosoft(@RequestBody MicrosoftToken microsoftToken, HttpServletResponse response, HttpServletRequest request) {
    //     authService.authenticateUser("microsoft", microsoftToken.getToken(), request, response);
    // }

    public static class GoogleToken {
        private String token;

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }
    }
}