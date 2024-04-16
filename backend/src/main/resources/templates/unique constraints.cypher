CREATE(s:Skill{name: 'DevOps'}),(s2:Skill{name: 'Front-End Developer'}), (s3:Skill{name: 'Software Engineer'}), (s4:Skill{name: 'Data Engineer'}) RETURN s, s2, s3, s4

CREATE CONSTRAINT project_name_is_unique FOR (pr:Project) REQUIRE pr.title IS UNIQUE

CREATE CONSTRAINT email_is_unique FOR (p:Person) REQUIRE p.email IS UNIQUE