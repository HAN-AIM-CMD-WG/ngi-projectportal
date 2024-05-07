package nl.han.ngi.projectportalbackend.core.models;

public class Company {
    String uuid;
    private String name;

    public Company(){
        // Empty constructor required as of Neo4j API 2.0.5
    }

    public Company(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }
}
