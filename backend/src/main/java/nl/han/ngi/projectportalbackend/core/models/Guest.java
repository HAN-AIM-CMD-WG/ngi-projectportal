package nl.han.ngi.projectportalbackend.core.models;

import java.util.List;

public class Guest {

    private String name;
    private String email;
    private List<String> status;

    private String pictureUrl;

    public Guest(){
        // Empty constructor required as of Neo4j API 2.0.5
    }

    public Guest(String name, String email, List<String> status, String pictureUrl){
        this.name = name;
        this.email = email;
        this.status = status;
        this.pictureUrl = pictureUrl;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getPictureUrl() {
        return pictureUrl;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }
}
