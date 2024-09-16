export interface Task {
    uuid: string;
    projectUuid: string;
    title: string;
    description: string;
    completed: boolean;
    category: string;
    skills: string[];
    assignedTo: string | null;
    dueDate: string;
    comments: string[];
  }
  
  export interface NewTask {
    title: string;
    description: string;
    category: string;
    skills: string[];
    dueDate: string;
    assignedTo?: string | null;
    comments?: string[];
  }
  