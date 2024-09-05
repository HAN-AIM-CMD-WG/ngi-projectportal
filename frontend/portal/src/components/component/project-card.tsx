import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { createTask } from '@/app/slices/projectSlice';
import { Project } from '@/app/types/project';
import { Link } from 'react-router-dom';

export default function ProjectCard({
  project: project
}: {
  project: Project;
}) {
  const [taskName, setTaskName] = useState('');
  const [taskSkills, setTaskSkills] = useState('');
  const dispatch = useAppDispatch();
  const { email } = useAppSelector(state => state.auth);
  const userRoles = useAppSelector(state => state.auth.roles);

  const handleAddTask = () => {
    if (taskName && taskSkills) {
      const newTask = {
        title: taskName,
        skills: taskSkills.split(',').map(skill => skill.trim())
      };
      dispatch(
        createTask({
          creator: email || '',
          projectUuid: project.uuid,
          task: newTask
        })
      );
      setTaskName('');
      setTaskSkills('');
    }
  };

  return (
    <Link to={`/project/${project.uuid}`} style={{ textDecoration: 'none' }}>
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            {project.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">{project.description}</p>
          <p className="text-xs text-gray-400">
            Created: {new Date(project.created).toLocaleDateString()}
          </p>

          <div className="mt-4">
            <h4 className="text-sm font-medium">Tasks</h4>
            {project.tasks && project.tasks.length > 0 ? (
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {project.tasks.map((task, index) => (
                  <li key={index}>
                    {task.title} -{' '}
                    <span className="text-xs text-gray-500">
                      {task.skills.join(', ')}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-gray-400">No tasks added yet.</p>
            )}
          </div>
        </CardContent>

        {userRoles.includes('OPDRACHTGEVER') && (
          <CardFooter className="flex flex-col space-y-4">
            <Label htmlFor={`taskName-${project.uuid}`}>Task Name</Label>
            <Input
              id={`taskName-${project.uuid}`}
              value={taskName}
              onChange={e => setTaskName(e.target.value)}
              placeholder="Enter task name"
            />

            <Label htmlFor={`taskSkills-${project.uuid}`}>
              Required Skills (comma-separated)
            </Label>
            <Input
              id={`taskSkills-${project.uuid}`}
              value={taskSkills}
              onChange={e => setTaskSkills(e.target.value)}
              placeholder="e.g. React, TypeScript"
            />

            <Button onClick={handleAddTask} className="self-end">
              Add Task
            </Button>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
