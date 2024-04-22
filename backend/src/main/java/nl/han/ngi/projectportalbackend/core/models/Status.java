package nl.han.ngi.projectportalbackend.core.models;

public class Status {


    String name;

    public Status(){
        // Empty constructor required as of Neo4j API 2.0.5
    }
    public Status(String name){
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
