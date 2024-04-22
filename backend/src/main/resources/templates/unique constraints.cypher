CREATE CONSTRAINT email_is_unique FOR (p:Person) REQUIRE p.email IS UNIQUE

CREATE CONSTRAINT project_name_is_unique FOR (pr:Project) REQUIRE pr.title IS UNIQUE