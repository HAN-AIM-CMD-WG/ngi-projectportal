export type Project = {
  uuid: string;
  title: string;
  description: string;
  created: string;
  tasks: Task[];
};

interface Task {
  title: string;
  skills: string[];
}
