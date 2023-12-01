package nl.han.ngi.projectportalbackend.core.models;


import java.util.List;

public class Person {
    private String name;
    private String email;
    private List<String> status;
    enum Status {
        OPDRACHTGEVER,
        DEELNEMER,
        ADMIN,
        GAST
    }
    public Person(){
        // Empty constructor required as of Neo4j API 2.0.5
    }

    public Person(String name, String email, List<String> status) {
        this.name = name;
        this.email = email;
        this.status = status;
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

}
