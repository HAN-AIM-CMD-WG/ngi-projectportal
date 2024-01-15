package nl.han.ngi.projectportalbackend.api.controllers;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

@RestController
public class AuthenticationController {

    @GetMapping("/api/checkAuth")
    public ResponseEntity<?> checkAuthentication() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated() && !(authentication.getPrincipal() instanceof String)) {
            User user = (User) authentication.getPrincipal();
            String roles = String.join(",", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).toArray(String[]::new));

            return ResponseEntity.ok("{\"email\":\"" + user.getUsername() + "\",\"roles\":\"" + roles + "\"}");
        } else {
            return ResponseEntity.status(HttpServletResponse.SC_UNAUTHORIZED).body("{\"error\":\"User not authenticated\"}");
        }
    }
}
