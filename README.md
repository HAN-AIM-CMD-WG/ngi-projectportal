# ngi-projectportal-back-end
This is the repository that contains the back-end application code.

In this readme you can find general information about this project and also a quick start-up so you can run it locally on your own machine.

This project uses the Springboot framework in combination with the following dependencies:
* Spring Web
* Spring Data Neo4j

## Quickstart
This is a step-by-step procedure to run the back-end locally. Because we use Neo4j it's more difficult to set it up. The quickstart is a step-by-step guide for Windows installations. In the future there will be a second quickstart for Docker as well.

### Installing and configuring Neo4j for Windows

_Side-note: If you already have Neo4j installed go to step 4._

1. Download and install [Neo4j](https://neo4j.com/download/neo4j-desktop) from their website. For reference, we are using Neo4j version 1.5.9.
2. After downloading it, run the installer normally and don't change anything.
3. Click on "Run Neo4j Desktop"
4. When Neo4j Desktop is open, click on the top-left side on + New next to "Projects" and call it NGI
5. In the folder click on the top-right side on + Add, select Local DBMS
6. Name the database: projectportal. Let username be default and use the password described in: src.main.resources.application.properties
7. Click on Create
8. Click on Start next to the project
9. Open a browser and go to localhost:7474
10. Login with the username and password defined in step 6
11. If you successfully logged in that means your database is up and running

## Frontend setup/installation

1. navigate to the **Frontend** folder from the **Root**.
2. Open a terminal
3. Run the following command: NPM install
4. After the install is complete, run the following command to start the project: NPM run dev
5. Click on the link in the terminal to go to the project.