# ngi-projectportal

This is the repository that contains the application code for the NGI projectportal.

In this readme you can find general information about this project and also a quick start-up so you can run it locally on your own machine.

This project uses the Springboot framework in combination with the following dependencies:

- Spring Web
- Spring Data Neo4j

## Pre-requisites

### Back-end

For the back-end we use Java Version 17 and Neo4j version 1.5.9. You can download Java from the [official website](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html) and Neo4j from the [official website](https://neo4j.com/download/neo4j-desktop).

### Front-End

For the front-end we use Node.js. You can download Node.js from the [official website](https://nodejs.org/en/download/).

# Back-end setup/installation

## Quickstart

This is a step-by-step procedure to run the back-end locally. Because we use Neo4j it's more difficult to set it up. The quickstart is a step-by-step guide for Windows installations. In the future there will be a second quickstart for Docker as well.

### Installing and configuring Neo4j for Windows

_Side-note: If you already have Neo4j installed and at least version 1.5.9 go to step 4._

1. Download and install [Neo4j](https://neo4j.com/download/neo4j-desktop) from their website. For reference, we are currently developing using Neo4j version 1.5.9.
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
12. // TODO: Add a script to create the database (in progress)

### Running the back-end

Because we use IntelliJ IDEA as our IDE, we will use it to run the back-end. If you don't have IntelliJ IDEA installed, you can download it from the [official website](https://www.jetbrains.com/idea/download/). If you are a student you can get a free license for the Ultimate version. Get this license from the [IntelliJ website](https://www.jetbrains.com/community/education/#students).

After you have installed IntelliJ IDEA, you can follow these steps:

1. Open pom.xml in IntelliJ IDEA
2. Click on the green play button in the top-right corner
3. The back-end should now be running

# Frontend setup/installation

1. Open the **frontend** folder in Visual Studio Code or any other code editor.
2. Open a terminal
3. Navigate to the **\frontend\portal** folder
4. Run the following command: NPM install
5. After the install is complete, run the following command to start the project: NPM run dev
6. Click on the link in the terminal to go to the project.
