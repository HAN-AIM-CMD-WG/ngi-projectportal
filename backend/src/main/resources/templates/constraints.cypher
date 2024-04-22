CREATE CONSTRAINT project_name_is_unique IF NOT EXISTS
FOR (pr:Project)
REQUIRE pr.title IS UNIQUE

CREATE CONSTRAINT email_is_unique IF NOT EXISTS
FOR (p:Person)
REQUIRE p.email IS UNIQUE

CREATE CONSTRAINT task_is_unique IF NOT EXISTS
FOR (t:Task)
REQUIRE (t.title, t.description) IS UNIQUE