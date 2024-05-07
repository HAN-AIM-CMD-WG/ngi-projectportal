package nl.han.ngi.projectportalbackend.core.services.strategies;

import nl.han.ngi.projectportalbackend.core.services.PersonService;
import nl.han.ngi.projectportalbackend.core.services.strategies.AuthenticationStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@Service
public class GoogleAuthenticationStrategy implements AuthenticationStrategy {

    @Autowired
    private PersonService personService;
    @Autowired
    private RestTemplate restTemplate;

    private static final String USER_INFO_ENDPOINT = "https://www.googleapis.com/oauth2/v2/userinfo";

    @Override
    public boolean supports(String provider) {
        return "google".equalsIgnoreCase(provider);
    }

    @Override
    public Authentication authenticate(String token, HttpServletRequest request) {
        try {
            Map<String, Object> userInfo = fetchUserInfo(token);
            String email = (String) userInfo.get("email");
            String name = (String) userInfo.get("name");
            System.out.println(userInfo);
            String pictureUrl = (String) userInfo.get("picture");

            personService.createOrUpdatePerson(email, name, pictureUrl);
            List<GrantedAuthority> authorities = personService.fetchUserAuthorities(email);

            System.out.println(authorities);

            return new UsernamePasswordAuthenticationToken(new User(email, "", authorities), null, authorities);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    private Map<String, Object> fetchUserInfo(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        HttpEntity<String> entity = new HttpEntity<>("", headers);
        ResponseEntity<Map> response = restTemplate.exchange(USER_INFO_ENDPOINT, HttpMethod.GET, entity, Map.class);
        return response.getBody();
    }
}
