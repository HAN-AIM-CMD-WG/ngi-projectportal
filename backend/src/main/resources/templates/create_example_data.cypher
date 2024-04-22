CREATE(p:Person {email: 'jesseveldmaat@hotmail.nl', name: 'Jesse Veldmaat', status: ['ADMIN', 'OPDRACHTGEVER']}) RETURN p

CREATE(s:Skill{name: 'DevOps'}),(s2:Skill{name: 'Front-End Developer'}), (s3:Skill{name: 'Software Engineer'}), (s4:Skill{name: 'Data Engineer'}) RETURN s, s2, s3, s4

CREATE(status:Status{name: 'DEELNEMER'}),(status2:Status{name: 'ADMIN'}),(status3:Status{name: 'OPDRACHTGEVER'}) RETURN status, status2, status3

CREATE(pr:Project {title: 'NGI Project', description: 'Dit is het eerste project wat is gemaakt binnen dit project'}) RETURN pr

MATCH(p1:Person {email: 'jesseveldmaat@hotmail.nl'}),(pr1:Project {title:'NGI Project'}) CREATE(p1)-[:LEADS {title: 'opdrachtgever'}]->(pr1)

CREATE(t:Task {title: 'Back-end ontwerpen voor NGI', description: 'Binnen deze taak ga je bezig met het ontwikkelen van de back-end van NGI', reward: 'veel geld', isDone: 0, skills: ['DevOps', 'Data Engineer']}) RETURN t

MATCH(p2:Person {email: 'jesseveldmaat@hotmail.nl'}),(pr2:Project {title:'NGI Project'}), (t1 {title: 'Back-end ontwerpen voor NGI'}) CREATE(p2)-[:CREATED_TASK_FOR_PROJECT]->(t1)-[:PART_OF_PROJECT]->(pr2)
