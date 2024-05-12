import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTasks, addTask } from '@/app/slices/taskSlice';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import Task from './task';
import { Link } from 'react-router-dom';
import { TaskType } from '@/app/slices/taskSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

export function TaskManager() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(state => state.task.tasks);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('to-do');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      addTask({
        projectId: id ?? '',
        title,
        description,
        status: status as 'to-do' | 'in-progress' | 'completed',
        id: ''
      })
    );
    setTitle('');
    setDescription('');
    setStatus('to-do');
  };

  // Fetch tasks when component mounts or projectId changes
  useEffect(() => {
    console.log(id);
    if (id) {
      dispatch(fetchTasks(id));
    }
  }, [id, dispatch]);

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button size="icon" variant="outline">
            <ArrowLeftIcon className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="font-semibold text-lg md:text-xl">Task Manager</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
          <CardDescription>
            View and manage the tasks for this project.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              {tasks.map((task: TaskType) => (
                <Task key={task.id} task={task} />
              ))}
            </div>
            <Separator />
            <form className="grid gap-4" onSubmit={handleAddTask}>
              <div className="grid gap-2">
                <Label htmlFor="task-title">Task Title</Label>
                <Input
                  id="task-title"
                  value={title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                  }
                  placeholder="Enter task title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="task-description">Task Description</Label>
                <Textarea
                  id="task-description"
                  value={description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setDescription(e.target.value)
                  }
                  placeholder="Enter task description"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="task-status">Task Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        status.charAt(0).toUpperCase() + status.slice(1)
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="to-do"
                      selectedValues={[status]}
                      onSelectValue={() => setStatus('to-do')}
                    >
                      To Do
                    </SelectItem>
                    <SelectItem
                      value="in-progress"
                      selectedValues={[status]}
                      onSelectValue={() => setStatus('in-progress')}
                    >
                      In Progress
                    </SelectItem>
                    <SelectItem
                      value="completed"
                      selectedValues={[status]}
                      onSelectValue={() => setStatus('completed')}
                    >
                      Completed
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">Add Task</Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ArrowLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

export default TaskManager;
