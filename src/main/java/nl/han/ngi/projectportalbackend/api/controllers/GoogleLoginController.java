package nl.han.ngi.projectportalbackend.api.controllers;

import jakarta.servlet.http.HttpSession;
import nl.han.ngi.projectportalbackend.core.models.Guest;
import nl.han.ngi.projectportalbackend.core.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth/google")
public class GoogleLoginController {

    private static final String USER_INFO_ENDPOINT = "https://www.googleapis.com/oauth2/v2/userinfo";

    @Autowired
    private PersonService personService;

    @Autowired
    private RestTemplate restTemplate; // Autowired to encourage reuse and mock testing.

    @PostMapping
    public void loginWithGoogle(@RequestBody GoogleToken googleToken, HttpServletResponse response, HttpServletRequest request) {
        try {
            Map<String, Object> userInfo = fetchUserInfo(googleToken.getToken());
            String email = (String) userInfo.get("email");

            List<GrantedAuthority> authorities = processUser(email, userInfo);
            authenticateUser(email, authorities);

            persistSecurityContext(request);
            sendSuccessResponse(response, email, authorities);
        } catch (Exception e) {
            sendErrorResponse(response, e);
        }
    }

    private Map<String, Object> fetchUserInfo(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
        ResponseEntity<Map> response = restTemplate.exchange(USER_INFO_ENDPOINT, HttpMethod.GET, entity, Map.class);
        return response.getBody();
    }

    private List<GrantedAuthority> processUser(String email, Map<String, Object> userInfo) {
        if (!personService.doesPersonExist(email)) {
            createUnverifiedPerson(userInfo);
        }
        return fetchUserAuthorities(email);
    }

    private void createUnverifiedPerson(Map<String, Object> userInfo) {
        Guest unverifiedPerson = new Guest();
        unverifiedPerson.setEmail((String) userInfo.get("email"));
        unverifiedPerson.setName((String) userInfo.get("name"));
        unverifiedPerson.setStatus(Collections.emptyList());
        personService.createGuest(unverifiedPerson);
    }

    private List<GrantedAuthority> fetchUserAuthorities(String email) {
        return personService.doesPersonExist(email) ?
                personService.getPerson(email).getStatus().stream()
                        .map(status -> new SimpleGrantedAuthority("ROLE_" + status))
                        .collect(Collectors.toList()) :
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_GAST"));
    }

    private void authenticateUser(String email, List<GrantedAuthority> authorities) {
        Authentication authentication = new UsernamePasswordAuthenticationToken(new User(email, "", authorities), null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private void persistSecurityContext(HttpServletRequest request) {
        HttpSession session = request.getSession();
        session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());
    }

    private void sendSuccessResponse(HttpServletResponse response, String email, List<GrantedAuthority> authorities) throws IOException {
        String roles = authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        response.setContentType("application/json");
        response.getWriter().write(String.format("{\"message\":\"Successfully authenticated with Google.\", \"email\":\"%s\", \"roles\":\"%s\"}", email, roles));
        response.getWriter().flush();
    }

    private void sendErrorResponse(HttpServletResponse response, Exception e) {
        try {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "{\"error\":\"An error occurred during Google authentication.\"}");
        } catch (IOException ioException) {
            ioException.printStackTrace();
        }
    }

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