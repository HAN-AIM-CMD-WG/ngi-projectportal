import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  PlusCircle,
  Circle,
  Tag,
  User,
  Calendar,
  MessageSquare,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

type Skill = string;
type ProjectMember = string;

type Task = {
  id: number;
  text: string;
  description: string;
  completed: boolean;
  category: string;
  skills: Skill[];
  assignedTo: ProjectMember | null;
  dueDate: string;
  comments: string[];
};

const categories = ['Development', 'Design', 'Marketing', 'Research'];
const allSkills = [
  'JavaScript',
  'React',
  'Node.js',
  'UI/UX',
  'Graphic Design',
  'SEO',
  'Content Writing',
  'Data Analysis'
];
const projectMembers = ['Alice', 'Bob', 'Charlie', 'Diana'];

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      text: 'Implement user authentication',
      description:
        'Set up JWT-based authentication system with login and registration functionality.',
      completed: false,
      category: 'Development',
      skills: ['JavaScript', 'Node.js'],
      assignedTo: null,
      dueDate: '2023-07-15',
      comments: [
        'Remember to implement password hashing',
        'Consider adding social login options'
      ]
    },
    {
      id: 2,
      text: 'Design landing page',
      description:
        'Create a visually appealing and responsive landing page design for our main product.',
      completed: true,
      category: 'Design',
      skills: ['UI/UX', 'Graphic Design'],
      assignedTo: 'Alice',
      dueDate: '2023-07-10',
      comments: [
        'Incorporate company branding guidelines',
        'Optimize for mobile devices'
      ]
    },
    {
      id: 3,
      text: 'Conduct market research',
      description:
        'Analyze competitor products and gather user feedback to inform our product strategy.',
      completed: false,
      category: 'Research',
      skills: ['Data Analysis'],
      assignedTo: null,
      dueDate: '2023-07-20',
      comments: [
        'Focus on user pain points',
        'Prepare a presentation of findings'
      ]
    }
  ]);
  const [newTask, setNewTask] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState('Development');
  const [newSkills, setNewSkills] = useState<Skill[]>([]);
  const [newDueDate, setNewDueDate] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: newTask,
          description: newDescription,
          completed: false,
          category: newCategory,
          skills: newSkills,
          assignedTo: null,
          dueDate: newDueDate,
          comments: []
        }
      ]);
      setNewTask('');
      setNewDescription('');
      setNewSkills([]);
      setNewDueDate('');
      setIsAddingTask(false);
    }
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const assignTask = (id: number, member: ProjectMember) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, assignedTo: member } : task
      )
    );
  };

  const addComment = (id: number, comment: string) => {
    setTasks(
      tasks.map(task =>
        task.id === id
          ? { ...task, comments: [...task.comments, comment] }
          : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Project Task Manager
        </h1>

        <Card className="mb-8">
          <CardContent className="p-6">
            <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New Task
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Task</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="task" className="text-right">
                      Task
                    </Label>
                    <Input
                      id="task"
                      value={newTask}
                      onChange={e => setNewTask(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={newDescription}
                      onChange={e => setNewDescription(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <Select value={newCategory} onValueChange={setNewCategory}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Skills</Label>
                    <div className="col-span-3 flex flex-wrap gap-2">
                      {allSkills.map(skill => (
                        <Badge
                          key={skill}
                          variant={
                            newSkills.includes(skill) ? 'default' : 'outline'
                          }
                          className="cursor-pointer"
                          onClick={() =>
                            setNewSkills(prev =>
                              prev.includes(skill)
                                ? prev.filter(s => s !== skill)
                                : [...prev, skill]
                            )
                          }
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dueDate" className="text-right">
                      Due Date
                    </Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={newDueDate}
                      onChange={e => setNewDueDate(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <Button onClick={addTask}>Add Task</Button>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {tasks.map(task => (
            <Collapsible
              key={task.id}
              open={expandedTaskId === task.id}
              onOpenChange={() =>
                setExpandedTaskId(expandedTaskId === task.id ? null : task.id)
              }
            >
              <Card
                className={`transition-all duration-300 ${
                  task.completed ? 'opacity-60' : ''
                }`}
              >
                <CardContent className="p-4">
                  <CollapsibleTrigger className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-4">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                        id={`task-${task.id}`}
                        onClick={e => e.stopPropagation()}
                      />
                      <label
                        htmlFor={`task-${task.id}`}
                        className={`text-lg ${
                          task.completed
                            ? 'line-through text-muted-foreground'
                            : ''
                        }`}
                      >
                        {task.text}
                      </label>
                    </div>
                    {expandedTaskId === task.id ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4">
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        {task.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm text-muted-foreground flex items-center">
                          <Tag className="mr-1 h-4 w-4" />
                          {task.category}
                        </span>
                        {task.skills.map(skill => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center space-x-4">
                        <Select
                          value={task.assignedTo || ''}
                          onValueChange={value =>
                            assignTask(task.id, value as ProjectMember)
                          }
                        >
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Assign to..." />
                          </SelectTrigger>
                          <SelectContent>
                            {projectMembers.map(member => (
                              <SelectItem key={member} value={member}>
                                {member}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {task.assignedTo && (
                          <span className="text-sm text-muted-foreground flex items-center">
                            <User className="mr-1 h-4 w-4" />
                            Assigned to: {task.assignedTo}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Due: {task.dueDate}</span>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold flex items-center">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Comments
                        </h4>
                        {task.comments.map((comment, index) => (
                          <p
                            key={index}
                            className="text-sm text-muted-foreground"
                          >
                            {comment}
                          </p>
                        ))}
                        <div className="flex items-center space-x-2">
                          <Input
                            placeholder="Add a comment..."
                            onKeyPress={e => {
                              if (e.key === 'Enter') {
                                addComment(task.id, e.currentTarget.value);
                                e.currentTarget.value = '';
                              }
                            }}
                          />
                          <Button variant="outline" size="sm">
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </CardContent>
              </Card>
            </Collapsible>
          ))}
        </div>

        {tasks.length === 0 && (
          <div className="text-center text-muted-foreground mt-8">
            <Circle className="mx-auto h-12 w-12 mb-4" />
            <p>No tasks yet. Add a task to get started!</p>
          </div>
        )}

        {tasks.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              {tasks.filter(t => t.completed).length} of {tasks.length} tasks
              completed
            </p>
            <div className="w-full bg-muted rounded-full h-2.5 mt-2">
              <div
                className="bg-primary h-2.5 rounded-full transition-all duration-500"
                style={{
                  width: `${
                    (tasks.filter(t => t.completed).length / tasks.length) * 100
                  }%`
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
