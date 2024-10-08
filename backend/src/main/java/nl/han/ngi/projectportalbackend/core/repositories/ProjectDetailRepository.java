// src/main/java/nl/han/ngi/projectportalbackend/core/repositories/ProjectDetailRepository.java
package nl.han.ngi.projectportalbackend.core.repositories;

import nl.han.ngi.projectportalbackend.core.configurations.DbConnectionConfiguration;
import nl.han.ngi.projectportalbackend.core.exceptions.ProjectNotFoundException;
import nl.han.ngi.projectportalbackend.core.models.Project;
import nl.han.ngi.projectportalbackend.core.models.RoadmapStep;
import nl.han.ngi.projectportalbackend.core.models.Task;
import org.neo4j.driver.*;
import org.neo4j.driver.Record;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import static org.neo4j.driver.Values.parameters;

@Repository
public class ProjectDetailRepository {

    private final Driver driver;

    public ProjectDetailRepository(DbConnectionConfiguration db) {
        this.driver = db.getDriver();
    }

    public Project getProjectDetail(String uuid) {
        try (Session session = driver.session()) {
            // Fetch project details
            String query = "MATCH (pr:Project {uuid: $uuid}) " +
                    "OPTIONAL MATCH (t:Task {projectUuid: $uuid}) " +
                    "OPTIONAL MATCH (rs:RoadmapStep)-[:BELONGS_TO]->(pr) " +
                    "RETURN pr, collect(t) as tasks, collect(rs) as roadmapSteps";
            Result result = session.run(query, parameters("uuid", uuid));

            if (!result.hasNext()) {
                throw new ProjectNotFoundException(uuid);
            }

            Record record = result.next();
            Value prRecord = record.get("pr");
            String projectUuid = prRecord.get("uuid").asString();
            String title = prRecord.get("title").asString();
            String description = prRecord.get("description").asString();
            String nextSteps = prRecord.get("nextSteps").asString(""); // Default to empty string if null
            String image = prRecord.get("image").asString(""); // Default to empty string if null

            // Map roadmapSteps
            List<RoadmapStep> roadmapSteps = new ArrayList<>();
            for (var stepNode : record.get("roadmapSteps").values()) {
                if (stepNode.isNull()) continue;
                var stepMap = stepNode.asMap();
                RoadmapStep step = new RoadmapStep();
                step.setIcon((String) stepMap.get("icon"));
                step.setTitle((String) stepMap.get("title"));
                step.setDescription((String) stepMap.get("description"));
                roadmapSteps.add(step);
            }

            // Create Project object
            Project project = new Project();
            project.setUuid(projectUuid);
            project.setTitle(title);
            project.setDescription(description);
            project.setNextSteps(nextSteps);
            project.setImage(image);
            project.setRoadmapSteps(roadmapSteps);

            return project;
        }
    }

    public Project updateProjectDetail(String uuid, Project project) {
        try (Session session = driver.session()) {
            // Update project fields
            String updateQuery = "MATCH (pr:Project {uuid: $uuid}) " +
                    "SET pr.title = $title, pr.description = $description, pr.nextSteps = $nextSteps " +
                    "RETURN pr";
            Result result = session.run(updateQuery, parameters(
                    "uuid", uuid,
                    "title", project.getTitle(),
                    "description", project.getDescription(),
                    "nextSteps", project.getNextSteps()
            ));

            if (!result.hasNext()) {
                throw new ProjectNotFoundException(uuid);
            }

            // Remove existing roadmap steps
            String removeRoadmapQuery = "MATCH (rs:RoadmapStep)-[:BELONGS_TO]->(:Project {uuid: $uuid}) DETACH DELETE rs";
            session.run(removeRoadmapQuery, parameters("uuid", uuid));

            // Add updated roadmap steps
            List<RoadmapStep> roadmapSteps = project.getRoadmapSteps();
            if (roadmapSteps != null && !roadmapSteps.isEmpty()) {
                for (RoadmapStep step : roadmapSteps) {
                    String addRoadmapQuery = "MATCH (pr:Project {uuid: $uuid}) " +
                            "CREATE (rs:RoadmapStep {icon: $icon, title: $title, description: $description})-[:BELONGS_TO]->(pr)";
                    session.run(addRoadmapQuery, parameters(
                            "uuid", uuid,
                            "icon", step.getIcon(),
                            "title", step.getTitle(),
                            "description", step.getDescription()
                    ));
                }
            }

            // Optionally, handle tasks here if they are editable

            // Fetch and return the updated project
            return getProjectDetail(uuid);
        }
    }

    public void saveProjectImage(String uuid, MultipartFile imageFile) throws Exception {
        try (Session session = driver.session()) {
            byte[] imageBytes = imageFile.getBytes();
            String base64Image = Base64.getEncoder().encodeToString(imageBytes);

            String query = "MATCH (pr:Project {uuid: $uuid}) SET pr.image = $image RETURN pr";
            Result result = session.run(query, parameters("uuid", uuid, "image", base64Image));

            if (!result.hasNext()) {
                throw new ProjectNotFoundException(uuid);
            }
        }
    }

    // Additional methods for managing tasks can be added here if necessary
}
