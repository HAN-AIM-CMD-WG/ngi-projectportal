// src/main/java/nl/han/ngi/projectportalbackend/core/models/Project.java
package nl.han.ngi.projectportalbackend.core.models;

import java.time.LocalDate;
import java.util.List;

public class Project {
    private String uuid;
    private String title;
    private String description;
    private LocalDate created;

    // Additional Fields
    private String nextSteps;
    private String image; // Base64 encoded image
    private List<RoadmapStep> roadmapSteps;

    // List of tasks
    private List<Task> tasks;

    // Constructors
    public Project() {}

    public Project(String uuid, String title, String description, LocalDate created,
                   String nextSteps, String image, List<RoadmapStep> roadmapSteps, List<Task> tasks) {
        this.uuid = uuid;
        this.title = title;
        this.description = description;
        this.created = created;
        this.nextSteps = nextSteps;
        this.image = image;
        this.roadmapSteps = roadmapSteps;
        this.tasks = tasks;
    }

    // Getters and Setters

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getCreated() {
        return created;
    }

    public void setCreated(LocalDate created) {
        this.created = created;
    }

    public String getNextSteps() {
        return nextSteps;
    }

    public void setNextSteps(String nextSteps) {
        this.nextSteps = nextSteps;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public List<RoadmapStep> getRoadmapSteps() {
        return roadmapSteps;
    }

    public void setRoadmapSteps(List<RoadmapStep> roadmapSteps) {
        this.roadmapSteps = roadmapSteps;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }
}
