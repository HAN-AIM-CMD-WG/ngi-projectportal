package nl.han.ngi.projectportalbackend.api.controllers;

import jakarta.servlet.http.HttpSession;
import nl.han.ngi.projectportalbackend.core.models.Person;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import nl.han.ngi.projectportalbackend.core.models.UnverifiedPerson;
import nl.han.ngi.projectportalbackend.core.services.PersonService;
import org.springframework.security.core.GrantedAuthority;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth/google")
public class GoogleLoginController {

    @Autowired
    private PersonService personService;

    @PostMapping
    public void loginWithGoogle(@RequestBody GoogleToken googleToken, HttpServletResponse response, HttpServletRequest request) throws IOException {
        try {
            System.out.println("Received Google access token: " + googleToken.getToken());

            final String userInfoEndpoint = "https://www.googleapis.com/oauth2/v2/userinfo";
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "Bearer " + googleToken.getToken());
            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
            ResponseEntity<Map> userInfoResponse = restTemplate.exchange(userInfoEndpoint, HttpMethod.GET, entity, Map.class);
            Map<String, Object> userInfo = userInfoResponse.getBody();

            assert userInfo != null;
            String email = (String) userInfo.get("email");
            System.out.println("User email from Google UserInfo: " + email);

            boolean personExists = personService.doesPersonExist(email);
            if (!personExists) {
                UnverifiedPerson unverifiedPerson = new UnverifiedPerson();
                unverifiedPerson.setEmail(email);
                unverifiedPerson.setName((String) userInfo.get("name"));
                unverifiedPerson.setStatus(Collections.singletonList("GAST"));
                personService.createUnverifiedPerson(unverifiedPerson);
                System.out.println("Created unverified person: " + email);
            }

            List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_GAST"));
            if (personExists) {
                Person person = personService.getPerson(email);
                authorities = person.getStatus().stream()
                        .map(status -> new SimpleGrantedAuthority("ROLE_" + status))
                        .collect(Collectors.toList());
                System.out.println("Person exists: " + email);
                System.out.println("Person roles: " + authorities.stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(",")));
            }

            Authentication authentication = new UsernamePasswordAuthenticationToken(new User(email, "", authorities), null, authorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String roles = authorities.stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.joining(","));

            HttpSession session = request.getSession();
            session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

            response.setContentType("application/json");
            response.getWriter().write("{\"message\":\"Successfully authenticated with Google.\", \"email\":\"" + email + "\", \"roles\":\"" + roles + "\"}");
            response.getWriter().flush();
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "{\"error\":\"An error occurred during Google authentication.\"}");
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