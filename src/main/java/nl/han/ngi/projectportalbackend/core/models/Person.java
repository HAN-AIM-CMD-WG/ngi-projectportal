package nl.han.ngi.projectportalbackend.core.models;


import java.util.List;

public class Person {
    private String name;
    private String email;
    private String password;
    private List<String> status;
    enum Status {
        OPDRACHTGEVER,
        DEELNEMER,
        ADMIN
    }
    public Person(){
        // Empty constructor required as of Neo4j API 2.0.5
    }

    public Person(String name, String email, String password, List<String> status) {
        this.name = name;
        this.email = email;
        this.status = status;
        this.password = password;
    }
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<String> getStatus() {
        return status;
    }

    public void setStatus(List<String> status) {
        this.status = status;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword(){
        return password;
    }

    public void setPassword(String password){
        this.password = password;
    }
}
