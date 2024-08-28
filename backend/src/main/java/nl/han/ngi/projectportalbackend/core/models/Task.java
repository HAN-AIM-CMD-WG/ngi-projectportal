package nl.han.ngi.projectportalbackend.core.models;

import java.util.List;

public class Task {
    String uuid;
    String projectUuid;
    String title;
    int isDone;
    List<String> skills;
    public String getTitle() {
        return title;
    }

    public String getProjectUuid() {
        return projectUuid;
    }

    public void setProjectUuid(String projectUuid) {
        this.projectUuid = projectUuid;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getIsDone() {
        return isDone;
    }

    public void setIsDone(int done) {
        isDone = done;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }
}
